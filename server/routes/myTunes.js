const express = require('express');
const router = express.Router();
const { home, getUser, createUser } = require('../controllers/users')
const checkUser = require('../middleware/checkUser')

/* GET users listing. */
router.post('/', home)
router.get('/user', getUser)
router.post('/user', createUser)  

module.exports = router;
