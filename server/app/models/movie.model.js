module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define("movies", {
    title: {
      type: Sequelize.STRING,
    },
    tagline: {
      type: Sequelize.STRING,
    },
    release_date: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    runtime: {
      type: Sequelize.INTEGER,
    },
    original_language: {
      type: Sequelize.STRING,
    },
    homepage: {
      type: Sequelize.STRING,
    },
    budget: {
      type: Sequelize.INTEGER,
    },
    revenue: {
      type: Sequelize.INTEGER,
    },
    imdb_id: {
      type: Sequelize.STRING,
    },
    overview: {
      type: Sequelize.TEXT,
    },
    poster_path: {
      type: Sequelize.STRING,
    },
    backdrop_path: {
      type: Sequelize.STRING,
    },
    vote_average: {
      type: Sequelize.FLOAT,
    },
    vote_count: {
      type: Sequelize.INTEGER,
    },
    popularity: {
      type: Sequelize.FLOAT,
    },
  });
  return Movie;
};
