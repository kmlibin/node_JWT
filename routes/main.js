const express = require('express');

//set up router
const router = express.Router();

//controllers
const {login, dashboard} = require('../controllers/main');

router.route('/dashboard').get(dashboard);
router.route('/login').post(login);

module.exports = router;