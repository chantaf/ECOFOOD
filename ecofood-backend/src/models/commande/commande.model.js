const mongoose = require('mongoose')

const commandeSchema = new mongoose.Schema({
    quantite: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    adress:{
        type:String,
        required:true
    },
    tel:{
        type:String,
        required:true
    },
    prix:{
        type:String,
        required:true
    },
    status: {
        type: String,
        required: true
    },
    produit: {type:mongoose.Schema.ObjectId, ref: 'produits'},
    client: {type:mongoose.Schema.ObjectId, ref: 'clients'},
    livreur: {type:mongoose.Schema.ObjectId, ref: 'livreurs'},
})

module.exports = mongoose.model('commande', commandeSchema)