const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// Route to handle form submissions
router.post('/submit-form', formController.submitForm);

module.exports = router;
