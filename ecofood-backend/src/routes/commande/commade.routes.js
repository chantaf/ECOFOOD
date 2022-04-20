
const commande = require("../../controller/commande/commande.contoller");
const express = require("express")
const router = express.Router();


//commande
router.get('/', commande.index);
router.get('/count', commande.countcommande);
router.post('/store', commande.store);
router.put('/:_id', commande.updateStatus);
router.put('/affecter/:_id', commande.affectercommande);

module.exports = router;