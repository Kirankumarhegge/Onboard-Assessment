const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/signup', userController.signup);

router.post('/check-nickname', userController.checkNickname);

module.exports = router;
