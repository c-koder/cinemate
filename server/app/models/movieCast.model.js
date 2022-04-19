module.exports = (sequelize, Sequelize) => {
  const MovieCast = sequelize.define("movie_casts", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    order: { type: Sequelize.INTEGER },
    character: { type: Sequelize.STRING },
  });
  return MovieCast;
};
