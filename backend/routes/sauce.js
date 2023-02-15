const express = require('express');

const router = express.Router();
//import modèle sauce
const sauceCtrl = require('../controllers/sauce'); 

//import middleware qui gère l'authentification
const auth = require('../middleware/auth');
//multer pour sauvegarder images sur le serveur
const multer = require('../middleware/multer-config'); 

//routes CRUD
router.get('/', auth, sauceCtrl.getAllSauce);//route qui récupère toutes les sauces
router.get('/:id', auth, sauceCtrl.getOneSauce); // route qui récupère 1 seule sauce
router.post('/', auth, multer, sauceCtrl.createSauce); //route pour créer une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce); // route pour modifier une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce); // route pour supprimer une sauce
//router.post('/:id/like', auth, sauceCtrl.likeOrDislike);

module.exports = router;