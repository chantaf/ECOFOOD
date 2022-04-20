const admins = require("../../models/admin/admin.model");
const bcrypt = require('bcryptjs');
const { comparePassword } = require('../../helpers/JwtValidation');


//login admin
const loginadmin = async (req, res) => {
    //get body from http req 
    const { email, password } = req.body
    try {
        if (!email || !password) return res.status(404).json({ message: "Please fill all the fields" }) // input validation
        const existingadmin = await admins.findOne({ email }) // find user data with email
        if (!existingadmin) return res.status(404).json({ message: "admin not found"}) // error message
        const role = 'admin';
        comparePassword(password, existingadmin, role, res) // comporassion password && data => jwt
    } catch (error) {
        res.status(404).json({ message: error.message }) // req error
    }
}


// get all admin 
const index = async (req, res) => {
    try {
        const admin = await admins.find()
        res.status(200).json({admin})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// create new admin
const store = async (req, res) => {
    //get body from http req 
    const {nom, prenom, email ,password} = req.body
   
    try {
        if (!nom || !prenom || !email  || !password )
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation

     
        const hashedPassword = await bcrypt.hash(password, 10) //hashing password 
        //validation email
        let regix = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailvalide=regix.test(email);
        if(emailvalide){
            // add admin
            const newadmin = await admins.create({
                nom,
                prenom,
                email,
                password: hashedPassword,
            })
                res.status(200).json({ newadmin })
                res.status(200).json( "admin ajouter avec success" )

        }else{
            return res.status(400).json({ message: "email invalide" })
        }
      
    } catch (err) {
        res.status(400).json({ error: err.message }) //req error
    } 
}

//delete admin
const deleteadmin = async (req, res) => {
    const id=req.params
    try {
        await admins.findByIdAndDelete(id) //delete admin by id
        res.status(200).json( "admin supprimer avec success" )
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


//Update  compte admin
const updateadmin = async (req, res) => {
    //get body from http req 
    const {nom, prenom, email ,password}= req.body
    const id=req.params
    const record = { _id: id };
    try {
        if (!nom || !prenom || !email  || !password )
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
        
        const updateadmin = await admins.updateOne(record, {
            $set: {
                nom: nom,
                prenom: prenom,
                email: email,
                password: password,
            }
        })
        res.status(200).json({ updateadmin })
        res.status(200).json("admin modifier avec success")
    } catch (err) {
        res.status(400).json({ error: err.message }) // req error
    }
}


module.exports = {
    index,
    loginadmin,
    store,
    deleteadmin,
    updateadmin
};