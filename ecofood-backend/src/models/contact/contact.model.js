const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
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
    tel:{
        type: String,
        required: true
    },   
    sujet: {
        type: String,
        required: true
    },  
    description: {
        type: String,
        required: true
    },
    reponse : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('contacts', contactSchema)