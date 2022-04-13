const db = require("../models");
const Movie = db.movie;
const Category = db.category;
const Cast = db.cast;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Movie
  const movie = {
    type: req.body.type,
    title: req.body.title,
    director: req.body.director,
    country: req.body.country,
    release_year: req.body.release_year,
    rating: req.body.rating,
    duration: req.body.duration,
    description: req.body.description,
  };
  // Save Movie in the database
  Movie.create(movie)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Movie.",
      });
    });
};

const getPagination = (page, size) => {
  const limit = size ? +size : 12;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (count, data, page, limit) => {
  const { rows: movies } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(count / limit);
  return { count, movies, totalPages, currentPage };
};

exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  const { limit, offset } = getPagination(page, size);

  Movie.findAndCountAll({
    where: condition,
    limit,
    offset,
    include: [
      {
        model: Category,
        as: "categories",
        attributes: ["id", "name"],
      },
      {
        model: Cast,
        as: "casts",
        attributes: ["id", "name"],
      },
    ],
  })
    .then((data) => {
      Movie.count({
        distinct: true,
        col: "movies.id",
      }).then((count) => {
        const response = getPagingData(count, data, page, limit);
        res.send(response);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving movies.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Movie.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Movie with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Movie with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Movie.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Movie was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Movie with id=${id}. Maybe Movie was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Movie with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Movie.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Movie was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Movie with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Movie.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Movies were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all movies.",
      });
    });
};
