module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define("reviews", {
    username: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    rating: {
      type: Sequelize.FLOAT,
    },
  });
  return Review;
};
