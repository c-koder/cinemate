module.exports = (sequelize, Sequelize) => {
  const Recommendations = sequelize.define("recommendations", {
    q1: {
      type: Sequelize.STRING,
    },
    q2: {
      type: Sequelize.INTEGER,
    },
    q3: {
      type: Sequelize.INTEGER,
    },
    q4: {
      type: Sequelize.INTEGER,
    },
    q5: {
      type: Sequelize.INTEGER,
    },
    q6: {
      type: Sequelize.INTEGER,
    },
    q7: {
      type: Sequelize.INTEGER,
    },
    q8: {
      type: Sequelize.INTEGER,
    },
  });
  return Recommendations;
};
