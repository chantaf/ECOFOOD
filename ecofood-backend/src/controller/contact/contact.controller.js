const contacts = require("../../models/contact/contact.model");

// get all contact 
const index = async (req, res) => {
    try {
        const contact = await contacts.find() 
        res.status(200).json({contact})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// create new contact
const store = async (req, res) => {
    //get body from http req 
    const { nom, prenom ,email, tel ,sujet,description} = req.body
    const role="contact";
    try {
        if (!email || !nom || !prenom || !tel || !sujet || !description )
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
        // add contact
        const newcontact = await contacts.create({
            nom,
            prenom,
            email,
            tel,
            sujet,
            description,
        })
        res.status(200).json( newcontact )
        res.status(200).json("contact ajouter avec success")
    } catch (err) {
        res.status(400).json({ error: err.message }) // req error
    }
}

//delete contact
const deletecontact = async (req, res) => {
    const { id } = req.params
    try {
        await contacts.findByIdAndDelete(id) //delete contact by id
        res.status(200).json({ message: "contact supprimer avec success" })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//repense contact
const updatecontact = async (req, res) => {
    //get body from http req 
    const {repense}= req.body
    const id=req.params
    const record = { _id: id };
    try {
        if (!repense)
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
        
        const updatecontact = await contacts.updateOne(record, {
            $set: {
                repense: repense,
            }
        })
        res.status(200).json( updatecontact )
        res.status(200).json("contact modifier avec success")
    } catch (err) {
        res.status(400).json({ error: err.message }) // req error
    }
}



module.exports = {
    index,
    store,
    deletecontact,
    updatecontact,
};