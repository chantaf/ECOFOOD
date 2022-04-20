const produits = require("../../models/produit/produit.model");
// const categorie = require("../../models/vendeur/.model");

// get all produit 
const index = async (req, res) => {
    try {
        const produit = await produits.find().populate("categorie")
        res.status(200).json({produit})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// count all produit 
const countproduit = async (req, res) => {
    try {
        const produit = await produits.find().count()
        res.status(200).json(produit)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


//create new produit
const store = async (req, res) => {
    //get body from http req 
    const { nom, prix, quantite,categorie} = req.body
   const images=req.file.path

   //console.log(req.body);
    try {
        if (!nom || !prix || !quantite  || !categorie || !images)
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
            // add produit
            const newproduit = await produits.create({
               
                nom,
                prix,
                quantite,
                categorie,
                images,
            })
              
            res.status(200).json(newproduit)
            res.status(200).json("produit ajouter avec success")
        } catch (err) {
            res.status(400).json({ error: err.message }) //req error
        }
}

//delete produit
const deleteproduit = async (req, res) => {
    const { id } = req.params
    try {
        await produits.findByIdAndDelete(id) //delete produit by id
        res.status(200).json({ message: "produit supprimer avec success" })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//Update  produit
const update = async (req, res) => {
    //get body from http req 
    const { nom, prix, quantite,categorie} = req.body
    const images=req.file.path
    const id=req.params
    const record = { _id: id };
    //console.log(req.body);
    try {
        if (!nom || !prix || !quantite  || !categorie || !images)
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
        const updateproduit = await produits.updateOne(record, {
            $set: {
            nom:nom,
            prix:prix,
            quantite:quantite,
            categorie:categorie,
            images:images,
        },

    });
        res.status(200).json({ updateproduit })

    } catch (err) {
        res.status(400).json({ error: err.message }) // req error
    }
}


module.exports = {
    index,
    store,
    deleteproduit,
    update,
    countproduit

};