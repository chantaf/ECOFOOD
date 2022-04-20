const clients = require("../../models/client/client.model");
const bcrypt = require('bcryptjs')
const { comparePassword } = require('../../helpers/JwtValidation')

//login client
const loginClient = async (req, res) => {
    //get body from http req 
    const { email, password } = req.body
    try {
        if (!email || !password) return res.status(404).json({ message: "Please fill all the fields" }) // input validation
        const existingClient = await clients.findOne({ email }) // find user data with email
        if (!existingClient) return res.status(404).json({ message: "client not found"}) // error message
        const role = 'client';
        comparePassword(password, existingClient, role, res) // comporassion password && data => jwt
    } catch (error) {
        res.status(404).json({ message: error.message }) // req error
    }
}

// get all client 
const index = async (req, res) => {
    try {
        const client = await clients.find() 
        res.status(200).json({client})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//count all client
const countclient = async (req, res) => {
    try {
        const client = await clients.count()
        res.status(200).json(client)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// create new client
const store = async (req, res) => {
    //get body from http req 
    const { nom, prenom ,email, tel ,password} = req.body
    const role="client";
    try {
        if (!email || !nom || !prenom || !tel || !password )
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
        const existingClient = await clients.findOne({ email }) // find user data with email
        if (existingClient) return res.status(400).json({ message: "client already exists" })  //error message
        const hashedPassword = await bcrypt.hash(password, 10) //hashing password 
        // add client
        const newclient = await clients.create({
            nom,
            prenom,
            email,
            password: hashedPassword,
            tel,
            role
        })
        res.status(200).json({ newclient })
        res.status(200).json("client ajouter avec success")
    } catch (err) {
        res.status(400).json({ error: err.message }) // req error
    }
}

//delete client
const deleteClient = async (req, res) => {
    const { id } = req.params
    try {
        await clients.findByIdAndDelete(id) //delete client by id
        res.status(200).json({ message: "client supprimer avec success" })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//Update  compte client
const updateclient = async (req, res) => {
    //get body from http req 
    const {nom, prenom, email ,password,tel}= req.body
    const role="client";
    const id=req.params
    const record = { _id: id };
    try {
        if (!nom || !prenom || !email  || !password || !tel)
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
        
        const updateclient = await clients.updateOne(record, {
            $set: {
                nom: nom,
                prenom: prenom,
                email: email,
                password: password,
                tel: tel,
                role: role
            }
        })
        res.status(200).json({ updateclient })
        res.status(200).json("client modifier avec success")
    } catch (err) {
        res.status(400).json({ error: err.message }) // req error
    }
}



module.exports = {
    index,
    loginClient,
    store,
    deleteClient,
    updateclient,
    countclient
};