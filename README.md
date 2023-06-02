# Projet 6 du parcours développeur Web :

# Construisez une API sécurisée pour une application d'avis gastronomiques
L'objectif de ce projet était de créer une API REST qui serve d’interface entre le front end d’une application d’évaluation de sauces piquantes et la base de données sous MongoDB avec Node.js, Express

Les différentes fonctionnalités à mettre en place depuis le front-end étaient les suivantes : 

- la possibilité de créer un compte utilisateur : la route/endpoint SIGNUP
- la possibilité de se connecter et de disposer d'un token valide : la route/endpoint LOGIN
- de permettre à l'utilisateur d'effectuer les opérations suivantes :
    - voir toutes les sauces;
    - ajouter une nouvelle sauce ;
    - modifier une sauce qu’il a créé ;
    - supprimer une sauce qu’il a créé  ;
    - ajouter un like ou un dislike sur toutes les sauces du catalogue et modifier son choix.

## Technologies + plugins utilisés 

- Angular (frontend)
- Node.js
- Express.js + Mongoose - MongoDB
- Plugins sécurité : 
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
        
