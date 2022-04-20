const categories = require("../../models/categorie/categorie.model");


// get all categorie 
const index = async (req, res) => {
    try {
        const categorie = await categories.find() 
        res.status(200).json({categorie})
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// get all categorie 
const countcategotie = async (req, res) => {
    try {
        const categorie = await categories.count() 
        res.status(200).json(categorie)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}



// create new categorie
const store = async (req, res) => {
    //get body from http req 
    const { nom} = req.body
    try {
        if (!nom )
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation

            // add categorie
            const newcategorie = await categories.create({
                nom,
            })
        res.status(200).json({ newcategorie })
        res.status(200).json("categorie ajouter avec success")
        } catch (err) {
            res.status(400).json({ error: err.message }) //req error
        }
}

//delete categorie
const deletecategorie = async (req, res) => {
    const id = req.params._id
    try {
        await categories.findByIdAndDelete(id) //delete categorie by id
        res.status(200).json({ message: "categorie supprimer avec success" })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//Update  categorie
const update= async (req, res) => {
    const {nom} = req.body
    const id = req.params._id
    const record = { _id: id };
    try {
        if (!nom)
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation
      
         const updatecategorie = await categories.updateOne(record, {   
            $set: {
                nom:nom,
            },
            }
        );
     
        res.status(200).json({ updatecategorie })
        res.status(200).json({ message: "categorie modifier avec success !" })    


    } catch (err) {
        res.status(400).json({ error: err.message }) // req error
    }
}


module.exports = {
    index,
    store,
    deletecategorie,
    update,
    countcategotie
};