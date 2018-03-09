const express = require('express');
const router = express.Router();
const home = require('../controllers/myTunes')
const user = require('../controllers/users')

/* GET home page. */
router.get('/',  user.login)

module.exports = router;
