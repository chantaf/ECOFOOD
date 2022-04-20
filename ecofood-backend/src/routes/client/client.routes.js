const client = require("../../controller/client/client.controller")
const express = require("express")
const router = express.Router();



//client
router.get('/', client.index);
router.post('/store', client.store);
router.post('/login', client.loginClient);
router.delete('/delete/:_id', client.deleteClient);
router.put('/update/:_id', client.updateclient);
router.get('/count', client.countclient);

module.exports = router;