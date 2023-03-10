 // import d'express
const express = require('express');
// création de l'application express
const app = express(); 
 //importation de mongoose
const mongoose = require('mongoose');
//import du path du server
const path = require('path');
//import des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require ('./routes/user');

//SECURITE
//Importation de dotenv pour les variables d'environement :
const dotenv = require("dotenv");
dotenv.config();
const helmet = require("helmet");
const rateLimit = require('express-rate-limit');

//connexion à MongoDB Atlas
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

// Helmet middleware - panoplie d'actions de sécurité
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// express-rate-limit middleware qui sécurise le nombre de requête sur l'API
const apilimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15min
  max: 100,// limite chaque requête par IP à 100
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(apilimiter); 

//definition de headers spécifiques pour permettre des requêtes cross.origin - CORS
app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//permet de récupérer des requêtes et de les afficher au format json
app.use(express.json()); 

//ROUTES
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname,'images')));

//Export du fichier app.js
module.exports = app;