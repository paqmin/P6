const express = require('express');
const router = express.Router(); //creation router

const userCtrl = require('../controllers/user');//controllers

router.post('/signup', userCtrl.signup); //méthode signup
router.post('/login', userCtrl.login);//méthode login

module.exports = router;//export router