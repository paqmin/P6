var passwordValidator = require("password-validator");

// Create a schema
var passwordSchema = new passwordValidator();

// Add properties to it
passwordSchema
  .is().min(5) // au moins 5 caractères
  .has().uppercase() // majuscules
  .has().lowercase() // minuscules
  .has().digits(1) // 1 chiffre au moins


module.exports = passwordSchema;