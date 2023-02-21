//Importation d'express
const express = require('express');
//Creation du router
const router = express.Router(); 

//importation du controller user.js
const userCtrl = require('../controllers/user');//controllers

//Route POST - signup
router.post('/signup', userCtrl.signup); 
//Route POST - login
router.post('/login', userCtrl.login);//méthode login

// Export des routes pour user.js 
module.exports = router;