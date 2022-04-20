const responsable = require("../../controller/responsable/responsable.controller")
const express = require("express")
const router = express.Router();




//responsables
router.get('/', responsable.index);
router.post('/store', responsable.store);
router.post('/login', responsable.loginresponsable);
router.delete('/delete/:_id', responsable.deleteresponsable);
router.put('/update/:_id', responsable.updateresponsable);

module.exports = router;