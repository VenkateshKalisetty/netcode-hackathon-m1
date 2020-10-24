const express = require('express');
const router = express.Router();
const userCntlr = require('../controllers/user');
const { authAdmin, authenticateRequest } = require("../controllers/auth");

router.get('/', authenticateRequest, userCntlr.getUsers);

router.put('/', authenticateRequest, authAdmin, userCntlr.updateUsertoAdmin);
router.post('/', userCntlr.addUser);

module.exports = router;