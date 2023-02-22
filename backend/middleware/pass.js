// Schema mot de passe
const passwordSchema = require("../models/Password");

//Vérification que le mot de passe choisi par l'utilisateur rempli les normes
module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
    
  } else {
   return res
   .status(400)
   .json({error : "Le mot de passe doit comprendre 5 caractères dont un chiffre, une majuscule et une minuscule"+ passwordSchema.validate('req.body.password',{list:true})})
    
  }
};
