const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.movie = require("./movie.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.cast = require("./cast.model.js")(sequelize, Sequelize);

db.category.belongsToMany(db.movie, {
  through: "movie_categories",
  foreignKey: "categoryId",
  otherKey: "movieId",
});
db.movie.belongsToMany(db.category, {
  through: "movie_categories",
  foreignKey: "movieId",
  otherKey: "categoryId",
});

db.cast.belongsToMany(db.movie, {
  through: "movie_cast",
  foreignKey: "castId",
  otherKey: "movieId",
});
db.movie.belongsToMany(db.cast, {
  through: "movie_cast",
  foreignKey: "movieId",
  otherKey: "castId",
});

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

module.exports = db;
