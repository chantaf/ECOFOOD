const admin = require("../../controller/admin/admin.controller")
const express = require("express")
const router = express.Router();



//admin
router.get('/', admin.index);
router.post('/store', admin.store);
router.post('/login', admin.loginadmin);
router.delete('/delete/:_id', admin.deleteadmin);
router.put('/update/:_id', admin.updateadmin);

module.exports = router;