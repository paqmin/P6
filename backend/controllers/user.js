const bcrypt = require('bcrypt');
const User = require ('../models/User')//modèle user
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        //fonction sign de jsonwebtoken pr chiffrer un nouveau token
                        token: jwt.sign( 
                            { userId: user._id }, //ID de l'utilisateur
                            'RANDOM_TOKEN_SECRET', //chaine secrete pour crypter token
                            { expiresIn: '24h' }//duree de validité 24h
                        )
                    });
                })
                .catch(error => res.status(500).json({ 
                    message: "Echec d'authentification",
                    error : error }));
        })
        .catch(error => res.status(500).json({ error }));
 };