module.exports = (sequelize, Sequelize) => {
  const Genre = sequelize.define("genres", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });
  return Genre;
};
