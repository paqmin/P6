//middlware qui gère l'authentification par token
// importation du package qui permet de créer et vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
    //extraction token
       const token = req.headers.authorization.split(' ')[1];
    //decodage token
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
     //méthode vérify permet de vérifier la validité d'un token  
       const userId = decodedToken.userId;
    //extraction de l'userID
       req.auth = {
           userId: userId
       };
	next();
    
   } catch(error) {console.log(error)
       res.status(401).json({ 
        message: "Echec d'authentification",
        error : error
       });
   }
};