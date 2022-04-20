const commentaire = require("../../controller/commentaire/commentaire.controller");
const express = require("express")
const router = express.Router();


//commentaire
router.get('/', commentaire.index);
router.post('/store', commentaire.store);
router.delete('/:_id', commentaire.deletecommentaire);
router.put('/:_id', commentaire.updatecommentaire);

module.exports = router;