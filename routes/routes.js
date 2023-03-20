const express = require('express');
const router = express.Router();

const controller = require('../controller/controller');

// Get home from the controller and asign it to the '/'
router.get('/', controller.home);

module.exports = router;