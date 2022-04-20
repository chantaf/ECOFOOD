const commentaires = require("../../models/commentaire/commentaire.model");

// get all commentaire 
const index = async (req, res) => {
    try {
        const commentaire = await commentaires.find().populate('produits').populate('clients')
        res.status(200).json({commentaire})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// create new commentaire
const store = async (req, res) => {
    //get body from http req 
    const { commentaire, produit ,client} = req.body
    try {
        if (!commentaire || !produit || !client )
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
       
        // add commentaire
        const newcommentaire = await commentaires.create({
            commentaire,
            produit,
            client
        })
        res.status(200).json({ newcommentaire })
        res.status(200).json("commentaire ajouter avec success")
    } catch (err) {
        res.status(400).json({ error: err.message }) // req error
    }
}

//delete commentaire
const deletecommentaire = async (req, res) => {
    const { id } = req.params
    try {
        await commentaires.findByIdAndDelete(id) //delete commentaire by id
        res.status(200).json({ message: "commentaire supprimer avec success" })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//Update  compte commentaire
const updatecommentaire = async (req, res) => {
    //get body from http req 
    const { commentaire, produit ,client} = req.body
    const id=req.params
    const record = { _id: id };
    try {
        if (!commentaire || !produit || !client )
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
        const updatecommentaire = await commentaires.updateOne(record, {
            $set: {
                commentaire: commentaire,
                produit: produit,
                client: client
            }
        })
        res.status(200).json({ updatecommentaire })
        res.status(200).json("commentaire modifier avec success")
    } catch (err) {
        res.status(400).json({ error: err.message }) // req error
    }
}



module.exports = {
    index,
    store,
    deletecommentaire,
    updatecommentaire,
};