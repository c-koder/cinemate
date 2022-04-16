const db = require("../models");
const Cast = db.cast;
const Movie = db.movie;

exports.create = (req, res) => {
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
    order: req.body.params.order,
    popularity: req.body.params.popularity,
    profile_path: req.body.params.profile_path,
  };

  Cast.findByPk(cast.id)
    .then((responseCast) => {
      if (responseCast) {
        Movie.findByPk(req.body.params.movie_id).then((responseMovie) => {
          responseMovie.addCast(responseCast);
          res.send({ message: "Movie Cast added successfully." });
        });
      } else {
        Cast.create(cast).then((createdCast) => {
          Movie.findByPk(req.body.params.movie_id).then((responseMovie) => {
            responseMovie.addCast(createdCast);
            res.send({ message: "Cast & Movie added successfully." });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Cast.",
      });
    });
};
