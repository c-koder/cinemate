module.exports = (sequelize, Sequelize) => {
  const Cast = sequelize.define("cast", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });
  return Cast;
};
