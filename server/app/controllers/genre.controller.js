const db = require("../models");
const Genre = db.genre;

exports.createIfNotExists = (id, name) => {
  return Genre.findByPk(id).then((genre) => {
    if (!genre) {
      return this.create(id, name);
    } else {
      return genre;
    }
  });
};

exports.findAll = (req, res) => {
  Genre.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          (">> Error while finding Genre: ", err) ||
          "Some error occurred while retrieving genres.",
      });
    });
};

exports.create = (id, name) => {
  return Genre.create({
    id: id,
    name: name,
  })
    .then((genre) => {
      return genre;
    })
    .catch((err) => {
      res.status(500).send({
        message:
          (">> Error while creating Genre: ", err) ||
          "Some error occurred while retrieving genres.",
      });
    });
};
