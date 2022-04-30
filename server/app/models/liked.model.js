module.exports = (sequelize, Sequelize) => {
  const Liked = sequelize.define("movie_likes", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  });
  return Liked;
};
