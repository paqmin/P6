//Importation d'express
const express = require('express');
//Creation du router
const router = express.Router(); 

//importation du controller user.js
const userCtrl = require('../controllers/user');

//import middleware qui gère l'authentification
const PassWord = require('../middleware/pass');

//Route POST - signup
router.post('/signup', PassWord, userCtrl.signup); 

//Route POST - login
router.post('/login', userCtrl.login);//méthode login

// Export des routes pour user.js 
module.exports = router;