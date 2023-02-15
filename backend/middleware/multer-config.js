const multer = require('multer');

const MIME_TYPES = { //dictionnaire extension
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({//configure chemin et nom de fichier
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