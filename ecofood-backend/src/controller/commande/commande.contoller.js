const commande = require("../../models/commande/commande.model");


// get all commandes 
const index = async (req, res) => {
    try {
        const commandes = await commande.find().populate('produits').populate('clients').populate('livreurs')
        res.status(200).json({commandes})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// count all commande 
const countcommande = async (req, res) => {
    try {
        const commandes = await commande.count()
        res.status(200).json(commandes)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}
//add new commande
const store = async (req, res) => {
    //get body from http req
    const { produit, clients, quantite, prix, adress,tel } = req.body
    const date = new Date(); 
    try {
        if (!produit || !clients || !quantite || !prix || !adress || !tel)
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
            // add produit
            const newcommande = await commande.create({
                produit,
                clients,
                quantite,
                prix,
                adress,
                tel,
                date: date,
                status:'encours'
            })
            res.status(201).json(newcommande)
            res.status(201).json("commande ajouter avec success")

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


//update commande status
const updateStatus  = async (req, res) => {
    try {
        const updateStatus = await commande.updateOne(
            {_id:req.params.id},
            {$set: { status:req.body.status }}
        )
        res.status(200).json(updateStatus)
        res.status(201).json("status commande modifier avec success")
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//affecter commande status
const affectercommande  = async (req, res) => {
    try {
        const affecter = await commande.updateOne(
            {_id:req.params.id},
            {$set: { livreur:req.body.livreur }}
        )
        res.status(200).json(affecter)
        res.status(201).json(" commande affecter avec success")
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}



module.exports = {
    index,
    store,
    updateStatus,
    countcommande,
    affectercommande
}