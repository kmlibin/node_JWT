const express = require('express');

//set up router
const router = express.Router();

//controllers
const {login, dashboard} = require('../controllers/main');

//middleware
const authenticationMiddleware = require('../middleware/auth')

router.route('/dashboard').get(authenticationMiddleware, dashboard);
router.route('/login').post(login);

module.exports = router;