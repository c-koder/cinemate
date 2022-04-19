const db = require("../models");
const Cast = db.cast;
const Movie = db.movie;
const MovieCast = db.movieCast;

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const [responseCast, created] = await Cast.findOrCreate({
    where: {
      id: req.body.params.id,
    },
    defaults: {
      id: req.body.params.id,
      name: req.body.params.name,
      popularity: req.body.params.popularity,
      profile_path: req.body.params.profile_path,
    },
  });

  Movie.findByPk(req.body.params.movie_id).then((responseMovie) => {
    responseMovie.addCast(responseCast, {
      through: {
        order: req.body.params.order,
        character: req.body.params.character,
      },
    });
    res.send({ message: "Movie Cast added successfully." });
  });
};

exports.findAll = (req, res) => {
  MovieCast.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movie casts.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  MovieCast.update(req.body.params, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Movie cast was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update movie cast with id=${id}. Maybe movie cast was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Movie with id=" + id,
      });
    });
};
