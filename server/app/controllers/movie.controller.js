const db = require("../models");
const Movie = db.movie;

const Genre = db.genre;
const GenreController = require("./genre.controller.js");

const Collection = db.collection;
const CollectionController = require("./collection.controller.js");

const Cast = db.cast;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Movie.create(req.body.params)
    .then((responseMovie) => {
      if (req.body.params.genres) {
        req.body.params.genres.map((genre) => {
          GenreController.createIfNotExists(genre.id, genre.name).then(
            (responseGenre) => {
              responseMovie.addGenre(responseGenre);
            }
          );
        });
      }

      if (req.body.params.belongs_to_collection) {
        CollectionController.createIfNotExists(
          req.body.params.belongs_to_collection
        ).then((responseCollection) => {
          responseMovie.addCollection(responseCollection);
        });
      }

      res.send({ message: "Movie added successfully." });
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

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: movies } = data;
  const currentPage = page ? +page : 12;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, movies, totalPages, currentPage };
};

exports.findAll = (req, res) => {
  const { page, size, title, genre, year, year_id, orderBy, ratedBy } =
    req.query;

  var sortByTitle = title ? { title: { [Op.like]: `%${title}%` } } : null;
  var sortByYear = null;
  if (year_id > 0) {
    if (year_id < 6) {
      sortByYear = { release_date: { [Op.like]: `%${year}%` } };
    } else {
      let lYear = year.split(" - ")[0];
      let hYear = year.split(" - ")[1];
      sortByYear = {
        release_date: {
          [Op.between]: [lYear, hYear + 1],
        },
      };
    }
  }

  var sortByRating =
    ratedBy && ratedBy != 0
      ? { vote_average: { [Op.gte]: parseInt(ratedBy.substring(0, 1), 10) } }
      : null;

  let orderByClause;
  if (orderBy == 0) {
    orderByClause = [["updatedAt", "DESC"]];
  } else if (orderBy == 1) {
    orderByClause = [["createdAt", "ASC"]];
  } else if (orderBy == 2) {
    orderByClause = [["popularity", "DESC"]];
  } else if (orderBy == 3) {
    orderByClause = [["release_date", "DESC"]];
  } else if (orderBy == 4) {
    orderByClause = [["title", "ASC"]];
  } else if (orderBy == 5) {
    orderByClause = [["vote_average", "DESC"]];
  } else {
    orderByClause = [["updatedAt", "DESC"]];
  }

  var sortByGenre = genre && genre != 0 ? { id: parseInt(genre, 10) } : null;

  const { limit, offset } = getPagination(page, size);

  Movie.findAndCountAll({
    include: {
      model: Genre,
      through: "movie_genres",
      where: sortByGenre,
    },
    where: { ...sortByTitle, ...sortByYear, ...sortByRating },
    order: orderByClause,
    limit,
    offset,
    distinct: true,
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
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
  Movie.update(req.body.params, {
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
