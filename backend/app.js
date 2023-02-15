const express = require('express'); // installation d'express
const app = express(); // création de l'application express
const mongoose = require('mongoose'); //importation de mongoose
const path = require('path');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require ('./routes/user');



mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://Caracole13:PqMnGd17@cluster0.qi2aeio.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => { //definition de headers spécifiques pour permettre des requêtes cross.origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});


app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

app.use(express.json()); //équivalent bodyparser

app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname,'images')));

module.exports = app;