//importation mongoose
const mongoose = require('mongoose');

//importation plugin uniquevalidator
const uniqueValidator = require('mongoose-unique-validator');

//Modèle user pour signup
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//Vérification email unique dans la BDD
userSchema.plugin(uniqueValidator);

//Exportation du userSchema
module.exports = mongoose.model('User', userSchema);