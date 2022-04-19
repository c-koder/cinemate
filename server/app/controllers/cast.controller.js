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
