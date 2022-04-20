const responsables = require("../../models/responsable/responsable.model");
const bcrypt = require('bcryptjs');
const { comparePassword } = require('../../helpers/JwtValidation');


//login responsable
const loginresponsable = async (req, res) => {
    //get body from http req 
    const { email, password } = req.body
    try {
        if (!email || !password) return res.status(404).json({ message: "Please fill all the fields" }) // input validation
        const existingresponsable = await responsables.findOne({ email }) // find user data with email
        if (!existingresponsable) return res.status(404).json({ message: "responsable not found"}) // error message
        const role = 'responsable';
        comparePassword(password, existingresponsable, role, res) // comporassion password && data => jwt
    } catch (error) {
        res.status(404).json({ message: error.message }) // req error
    }
}


//envoyer mail
function envoyermail(email,password){
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'testcoding975@gmail.com',
            pass: 'testCoding1998'
          }
        });    
        var mailOptions = {
          from: 'testcoding975@gmail.com',
          to: email,
          subject: 'Voila votre password  :',
          text:'password : '+  password
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (err) {
                return log('Error occurs');
            }
        });
        
    }


// get all responsable 
const index = async (req, res) => {
    try {
        const responsable = await responsables.find()
        res.status(200).json({responsable})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// create new responsable
const store = async (req, res) => {
    //get body from http req 
    const {nom, prenom, email } = req.body
   
    try {
        if (!nom || !prenom || !email   )
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation

            //generate password
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var string_length = 8;
            var password = '';
            for (var i=0; i<string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                password += chars.substring(rnum,rnum+1);
            }
            const generatPassword=password;
            const hashedPassword = await bcrypt.hash(generatPassword,10) //hashing password 
        //validation email
        let regix = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailvalide=regix.test(email);
        if(emailvalide){
            // add responsable
            const newresponsable = await responsables.create({
                nom,
                prenom,
                email,
                password: hashedPassword,
            })
                res.status(200).json({ newresponsable })
                envoyermail(email,generatPassword)
                res.status(200).json( "responsable ajouter avec success" )

        }else{
            return res.status(400).json({ message: "email invalide" })
        }
      
    } catch (err) {
        res.status(400).json({ error: err.message }) //req error
    } 
}

//delete responsable
const deleteresponsable = async (req, res) => {
    const id=req.params
    try {
        await responsables.findByIdAndDelete(id) //delete responsable by id
        res.status(200).json( "responsable supprimer avec success" )
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


//Update  compte responsable
const updateresponsable = async (req, res) => {
    //get body from http req 
    const {nom, prenom, email ,password}= req.body
    const id=req.params
    const record = { _id: id };
    try {
        if (!nom || !prenom || !email  || !password )
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
        
        const updateresponsable = await responsables.updateOne(record, {
            $set: {
                nom: nom,
                prenom: prenom,
                email: email,
                password: password,
            }
        })
        res.status(200).json({ updateresponsable })
        res.status(200).json("responsable modifier avec success")
    } catch (err) {
        res.status(400).json({ error: err.message }) // req error
    }
}


module.exports = {
    index,
    loginresponsable,
    store,
    deleteresponsable,
    updateresponsable
};