//import modèle Sauce
const Sauce = require('../models/Sauce');

exports.likeSauce = (req, res, next) => { 
    const SauceObject = req.body;
    const sauceId = req.params.id;
    const userId  = req.body.userId;
    const Likes = req.body.likes;
    const DisLikes = req.body.dislikes;

//selection de la sauce
Sauce.findOne(sauceId)
  .then((sauce) => {
    //si premier vote de l'utilisateur
    if (!sauce.usersLiked.includes(userId) || !sauce.usersDisLiked.includes(userId)){
          // Si like = 1, l'utilisateur aime (= like) la sauce - 1er vote
          if(Likes === 1){ 
            //actualisation ds MongoDB de l'objet Sauce
          Sauce.updateOne( 
              { _id: sauceId },
              {
              $inc: { likes: Likes},
              $push: { usersLiked: userId , like: Likes },
                }
            )
            .then((sauce) => res.status(201).json({ message: "Like +1" }))
            .catch((error) => {res.status(400).json({ error })});
            }

          //Si like = -1, l'utilisateur n'aime pas la sauce (=dislike) - 1er vote 
          if (Likes === -1){
              //actualisation ds MongoDB de l'objet Sauce
          Sauce.updateOne( 
            { _id: sauceId },
            {
            $inc: { dislikes: 1},
            $push: { usersdisLiked: userId , dislike: 1},
              }
          )
          .then((sauce) => res.status(201).json({ message: "DisLike +1" }))
          .catch((error) => {res.status(400).json({ error })});

            }
    }else {
      //utilisateur retire son like
      if(Likes === 0 && sauce.usersLiked.includes(userId)){
        //actualisation ds MongoDB de l'objet Sauce
        Sauce.updateOne( 
          { _id: sauceId },
          {
          $inc: { likes: -1},
          $pull: { usersLiked: userId },
            }
        )
        .then((sauce) => res.status(201).json({ message: "Like -1" }))
        .catch((error) => {res.status(400).json({ error })});
        }
      //utilisateur retire son dislike
      if(Likes === 0 && sauce.usersDisLiked.includes(userId)){
        //actualisation ds MongoDB de l'objet Sauce
        Sauce.updateOne( 
          { _id: sauceId },
          {
          $inc: { dislikes: 1},
          $pull: { usersDisLiked: userId },
            }
        )
        .then((sauce) => res.status(201).json({ message: "DisLike 1" }))
        .catch((error) => {res.status(400).json({ error })});
        }

      //si utilisateur change son like pour dislike
        if(Likes === -1 && sauce.usersLiked.includes(userId)){
          //actualisation ds MongoDB de l'objet Sauce
          Sauce.updateOne( 
            { _id: sauceId },
            {
            $inc: { likes :-1, dislikes: 1},
            $pull: { usersLiked: userId },
            $push: { usersDisLiked: userId },
              }
          )
          .then((sauce) => res.status(201).json({ message: "DisLike 1 / Like -1" }))
          .catch((error) => {res.status(400).json({ error })});
          }
        //si utilisateur change son dislike pour like
          if(Likes === -1 && sauce.usersDisLiked.includes(userId)){
            //actualisation ds MongoDB de l'objet Sauce
            Sauce.updateOne( 
              { _id: sauceId },
              {
              $inc: { likes :1, dislikes: -1},
              $pull: { usersDisLiked: userId },
              $push: { usersLiked: userId },
                }
            )
            .then((sauce) => res.status(201).json({ message: "Like 1 / Dislike -1" }))
            .catch((error) => {res.status(400).json({ error })});
            }

      }

    

    }) 
    
  .catch((error) => res.status(404).json({error}));
};