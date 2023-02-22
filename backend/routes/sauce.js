//Importation d'Express
const express = require('express');

// Appel d'express pour créer router
const router = express.Router();

//import middleware qui gère l'authentification
const auth = require('../middleware/auth');

//import du middleware multer pour sauvegarder images sur le serveur
const multer = require('../middleware/multer-config'); 

//import controller sauce
const sauceCtrl = require('../controllers/sauce'); 

//routes CRUD
//route qui récupère toutes les sauces - GET
router.get('/', auth, sauceCtrl.getAllSauce);

// route qui récupère 1 seule sauce - GET
router.get('/:id', auth, sauceCtrl.getOneSauce); 

//route pour créer une sauce - POST
router.post('/', auth, multer, sauceCtrl.createSauce); 

// route pour modifier une sauce - PUT
router.put('/:id', auth, multer, sauceCtrl.modifySauce); 

// route pour supprimer une sauce - DELETE
router.delete('/:id', auth, sauceCtrl.deleteSauce); 

// route like sauce - LIKE
router.post('/:id/like', auth, sauceCtrl.likeSauce);

//Exportation des routes pour les sauces - sauce.js
module.exports = router;