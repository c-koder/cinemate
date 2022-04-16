const db = require("../models");
const Collection = db.collection;

exports.createIfNotExists = (collection) => {
  return Collection.findByPk(collection.id).then((responseCollection) => {
    if (!responseCollection) {
      return this.create(collection);
    } else {
      return responseCollection;
    }
  });
};

exports.findAll = (req, res) => {
  Collection.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

exports.create = (collection) => {
  return Collection.create({
    id: collection.id,
    name: collection.name,
    poster_path: collection.poster_path,
    backdrop_path: collection.backdrop_path,
  })
    .then((responseCollection) => {
      return responseCollection;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
