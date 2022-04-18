module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define("reviews", {
    content: {
      type: Sequelize.STRING,
    },
  });
  return Review;
};
