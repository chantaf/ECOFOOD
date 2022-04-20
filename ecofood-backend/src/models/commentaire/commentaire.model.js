const mongoose = require('mongoose')

const commentaireSchema = new mongoose.Schema({
    commentaire: {
        type: String,
        required: true
    },
    produit: {type:mongoose.Schema.ObjectId, ref: 'produits'},
    client: {type:mongoose.Schema.ObjectId, ref: 'clients'},
     
})

module.exports = mongoose.model('commentaires', commentaireSchema)