module.exports = (sequelize, Sequelize) => {
  const Collection = sequelize.define("collections", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    poster_path: {
      type: Sequelize.STRING,
    },
    backdrop_path: {
      type: Sequelize.STRING,
    },
  });
  return Collection;
};
