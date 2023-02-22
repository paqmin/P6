//Gestion des requetes http avec envoi de fichier-images
//Import package multer
const multer = require('multer');

//dictionnaire d'extensions MIME_TYPES
const MIME_TYPES = { 
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
};
//configure chemin et nom de fichier
const storage = multer.diskStorage({
  //enregistrement dans dossier images
  destination: (req, file, callback) => {
    callback(null, 'images'); 
  },
  // création du nom du fichier
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');//supprime espaces par underscore
    const extension = MIME_TYPES[file.mimetype]; //gestion extension depuis dictionnaire
    callback(null, name + Date.now() + '.' + extension); //date.now - ajout date
  }
});
 //export middleware multer
module.exports = multer({storage: storage}).single('image');