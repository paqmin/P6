const Sauce = require('../models/Sauce');
const fs = require('fs');

//recherche d'une sauce en particulier avec son ID
exports.getOneSauce = (req, res, next) => { 
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};
//Lecture de ttes les sauces de la BDD
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces)) 
    .catch(error => res.status(400).json({ error }));
};
//creation d'une sauce - POST
exports.createSauce = (req, res, next) => {
    const sauceObjet = JSON.parse(req.body.sauce);//parser l'objet pour qu'il soit utilisable
    delete sauceObjet._id;//suppression de l'id
    delete sauceObjet._userId; //suppression de userID car on ne fait pas confiance à l'utilisateur
    // creation d'une nouvelle sauce
    const sauce = new Sauce ({
      ...sauceObjet,
      userID: req.auth.userId,
       // Création de l'URL de l'image : http://localhost:3000/image/nomdufichier 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
     // Enregistrement de l'objet sauce dans la BDD
    sauce.save()
    .then(() => { res.status(201).json({message: 'Sauce enregistrée !'})})
    .catch(error => { res.status(400).json( { error })})
  };
//creation de la route PUT pour modifier des objets - UPDATE
exports.modifySauce = (req, res, next) => { 
    const sauceObject = req.file ? 
    { //extraction de l'objet et vérification s'il y a un champ file ou pas
        ...JSON.parse(req.body.sauce), // si oui on le parse et on le transmet
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }; // sinon on le transmet dans le corps de la requete
  
    delete sauceObject._userId; //suppression de l'userId

    Sauce.findOne({_id: req.params.id}) //recuperation de l'objet 
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) { // si userID dif de celui du token : qq essaie de modifier un objet qui ne lui appartient pas
                res.status(404).json({ message : 'Not authorized'});
            } else { //si c'est bien le bon userId
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})//envoi des nouvelles données
                .then(() => res.status(200).json({message : 'Sauce modifiée!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };
//suppression d'une sauce - DELETE
exports.deleteSauce = (req, res, next) => { 
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => { 
        if (sauce.userId != req.auth.userId){//pas le même userID
          res.status(404).json({ message : 'Not authorized'});
        }else{//si même userID --suppression de l'image et de l'élement
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
             Sauce.deleteOne({_id: req.params.id})
              .then(() => { res.status(200).json({message: 'Objet supprimé'})})
              .catch(error => res.status(401).json({ error }));
          });

        }
      })
      .catch( error => {
        res.status(500).json({ error });
    });
};
