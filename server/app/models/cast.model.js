module.exports = (sequelize, Sequelize) => {
  const Cast = sequelize.define("casts", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    popularity: {
      type: Sequelize.FLOAT,
    },
    profile_path: {
      type: Sequelize.STRING,
    },
  });
  return Cast;
};
