const db = require("../models");
const Cast = db.cast;
const Movie = db.movie;

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const cast = {
    id: req.body.params.id,
    character: req.body.params.character,
    name: req.body.params.name,
    popularity: req.body.params.popularity,
    profile_path: req.body.params.profile_path,
  };

  const [responseCast, created] = await Cast.findOrCreate({
    where: {
      id: cast.id,
    },
    defaults: {
      id: req.body.params.id,
      character: req.body.params.character,
      name: req.body.params.name,
      popularity: req.body.params.popularity,
      profile_path: req.body.params.profile_path,
    },
  });

  Movie.findByPk(req.body.params.movie_id).then((responseMovie) => {
    responseMovie.addCast(responseCast, {
      through: { order: req.body.params.order },
    });
    res.send({ message: "Movie Cast added successfully." });
  });

  // const getCast = Cast.findOrCreate({where: {id: cast.id}, defaults: cast}.then((response) => {
  //   return response;
  // });

  // console.log(getCast);

  // Movie.findByPk(req.body.params.movie_id).then((responseMovie) => {
  //   responseMovie.addCast(responseCast, {
  //     through: { order: req.body.params.order },
  //   });
  //   res.send({ message: "Movie Cast added successfully." });
  // });

  // Cast.findByPk(cast.id)
  //   .then((responseCast) => {
  //     if (responseCast) {
  //       Movie.findByPk(req.body.params.movie_id).then((responseMovie) => {
  //         responseMovie.addCast(responseCast, {
  //           through: { order: req.body.params.order },
  //         });
  //         res.send({ message: "Movie Cast added successfully." });
  //       });
  //     } else {
  //       Cast.create(cast).then((createdCast) => {
  //         Movie.findByPk(req.body.params.movie_id).then((responseMovie) => {
  //           responseMovie.addCast(createdCast, {
  //             through: { order: req.body.params.order },
  //           });
  //           res.send({ message: "Movie Cast added successfully." });
  //         });
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while creating the Cast.",
  //     });
};
