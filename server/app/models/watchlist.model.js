module.exports = (sequelize, Sequelize) => {
  const Watchlist = sequelize.define("watchlist", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  });
  return Watchlist;
};
