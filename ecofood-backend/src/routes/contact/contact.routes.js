
const contact = require("../../controller/contact/contact.controller");
const express = require("express")
const router = express.Router();


//contact
router.get('/', contact.index);
router.post('/store', contact.store);
router.delete('/:_id', contact.deletecontact);
router.put('/:_id', contact.updatecontact);


module.exports = router;