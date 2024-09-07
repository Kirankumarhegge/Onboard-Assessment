const express = require('express');
const router = express.Router();
const assessController = require('../controllers/assessController');

router.get('/', assessController.getQuestions);

router.post('/submit', assessController.submitAnswer);

module.exports = router;
