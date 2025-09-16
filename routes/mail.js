const express = require('express');
const router = express.Router();
const mails = require('../controllers/mail');
router.post("/otp", mails.send);
router.post("/user",mails.usermail)
module.exports = router;