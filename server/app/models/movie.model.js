module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define("movies", {
    color: {
      type: Sequelize.STRING,
    },
    movie_title: {
      type: Sequelize.STRING,
    },
    genre: {
      type: Sequelize.STRING,
    },
    director_name: {
      type: Sequelize.STRING,
    },
    num_critic_for_reviews: {
      type: Sequelize.INTEGER,
    },
    duration: {
      type: Sequelize.INTEGER,
    },
    actor_1_name: {
      type: Sequelize.STRING,
    },
    actor_2_name: {
      type: Sequelize.STRING,
    },
    actor_3_name: {
      type: Sequelize.STRING,
    },
    gross: {
      type: Sequelize.FLOAT,
    },
    num_voted_users: {
      type: Sequelize.INTEGER,
    },
    plot_keywords: {
      type: Sequelize.STRING,
    },
    movie_imdb_link: {
      type: Sequelize.STRING,
    },
    language: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    content_rating: {
      type: Sequelize.STRING,
    },
    budget: {
      type: Sequelize.FLOAT,
    },
    title_year: {
      type: Sequelize.INTEGER,
    },
    imdb_score: {
      type: Sequelize.FLOAT,
    },
    aspect_ratio: {
      type: Sequelize.FLOAT,
    },
    movie_facebook_likes: {
      type: Sequelize.INTEGER,
    },
  });
  return Movie;
};
