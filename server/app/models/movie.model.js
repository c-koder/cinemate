module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define("movies", {
    type: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    director: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    release_year: {
      type: Sequelize.STRING,
    },
    rating: {
      type: Sequelize.STRING,
    },
    duration: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Movie;
};
