const livreurs = require("../../models/livreur/livreur.model");
const bcrypt = require('bcryptjs')
const { comparePassword } = require('../../helpers/JwtValidation')

//login livreur
const loginlivreur = async (req, res) => {
    //get body from http req 
    const { email, password } = req.body
    try {
        if (!email || !password) return res.status(404).json({ message: "Please fill all the fields" }) // input validation
        const existinglivreur = await livreurs.findOne({ email }) // find user data with email
        if (!existinglivreur) return res.status(404).json({ message: "livreur not found"}) // error message
        const role = 'livreur';
        comparePassword(password, existinglivreur, role, res) // comporassion password && data => jwt
    } catch (error) {
        res.status(404).json({ message: error.message }) // req error
    }
}

// get all livreur 
const index = async (req, res) => {
    try {
        const livreur = await livreurs.find() 
        res.status(200).json({livreur})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//count  all livreurs
const countlivreur = async (req, res) => {
    try {
        const livreur = await livreurs.count()
        res.status(200).json(livreur)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// create new livreur
const store = async (req, res) => {
    //get body from http req 
    const { nom, prenom ,email, tel ,password} = req.body
    const role="livreur";
    try {
        if (!email || !nom || !prenom || !tel || !password )
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
        const existinglivreur = await livreurs.findOne({ email }) // find user data with email
        if (existinglivreur) return res.status(400).json({ message: "livreur already exists" })  //error message
        const hashedPassword = await bcrypt.hash(password, 10) //hashing password 
        // add livreur
        const newManager = await livreurs.create({
            nom,
            prenom,
            email,
            password: hashedPassword,
            tel,
            role
        })
        res.status(200).json({ newManager })
        res.status(200).json("livreur ajouter avec success")
    } catch (err) {
        res.status(400).json({ error: err.message }) // req error
    }
}

//delete livreur
const deletelivreur = async (req, res) => {
    const { id } = req.params
    try {
        await livreurs.findByIdAndDelete(id) //delete livreur by id
        res.status(200).json({ message: "livreur supprimer avec success" })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//Update  compte livreur
const updatelivreur = async (req, res) => {
    //get body from http req 
    const {nom, prenom, email ,password,tel}= req.body
    const role="livreur";
    const id=req.params
    const record = { _id: id };
    try {
        if (!nom || !prenom || !email  || !password || !tel)
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
        
        const updateadmin = await admins.updateOne(record, {
            $set: {
                nom: nom,
                prenom: prenom,
                email: email,
                password: password,
                tel: tel,
                role: role
            }
        })
        res.status(200).json({ updateadmin })
        res.status(200).json("livreur modifier avec success")
    } catch (err) {
        res.status(400).json({ error: err.message }) // req error
    }
}



module.exports = {
    index,
    loginlivreur,
    store,
    deletelivreur,
    updatelivreur,
    countlivreur
};