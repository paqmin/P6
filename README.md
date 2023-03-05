# Projet 6 du parcours développeur Web :

Construisez une API sécurisée pour une application d'avis gastronomiques

## Technologies + plugins utilisés 

• Angular (frontend)
• Node.js
• Express.js + Mongoose - MongoDB
• Plugins sécurité : 
    - bcrypt (mot de passe)
    - dotenv
    - express rate limit
    - helmet
    - jsonwebtoken
    - mongoose unique validator
    - multer
    - password validator

## Installation 

1. Cloner le dossier : https://github.com/paqmin/P6.git
2. Installer Node.js
3. Installer Angular CLI
4. Installer Nodemon
5. Installer les dépendences pour les dossiers frontend et backend
6. Mettre en place le fichier .env à la racine
````text
PORT = 3000 

## MongoDB credentials 
DB_USERNAME=XXX
DB_PASSWORD=XXX
DB_CLUSTER =XXX

## Token 
TOKEN_KEY =XXX
````
7. Lancer le server backend avec 'npx nodemon server.js'. Le serveur se lance sur le port 3000
8. Lancer l'application  frontend angular dans le dossier frontend avec 'npm run start'- L'application est alors accessible via l'URL : http://localhost/4200
        
