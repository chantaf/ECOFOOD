const mongoose = require('mongoose')

const categorie = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    }, 
})

module.exports = mongoose.model('categorie', categorie)