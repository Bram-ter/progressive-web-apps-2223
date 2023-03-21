const express = require('express');
const router = express.Router();

const controller = require('../controller/controller');

// Get home from the controller and asign it to the '/'
router.get('/', controller.home);

// Get home from the controller and asign it to the '/my-work'
router.get('/my-work', controller.myWork);

module.exports = router;