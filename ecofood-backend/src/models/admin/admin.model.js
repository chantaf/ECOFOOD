const mongoose = require('mongoose')

const admin = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },    
    email: {
        type: String,
        required: true
    },    
    password: {
        type: String,
        required: true
    }  
})

module.exports = mongoose.model('admin', admin)