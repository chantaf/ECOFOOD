const mongoose = require('mongoose')

const produitSchema = new mongoose.Schema({
    nom: {
        type: Date,
        required: true
    },
    quantite: {
        type: Number,
        required: true
    },
    prix: {
        type: String,
        required: true
    },
    image:[{
        type:String,
        required:true
    }],
    categorie: {type:mongoose.Schema.ObjectId, ref:'categories'},
})

module.exports = mongoose.model('produit', produitSchema)