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
db.genre = require("./genre.model.js")(sequelize, Sequelize);
db.cast = require("./cast.model.js")(sequelize, Sequelize);
db.review = require("./review.model.js")(sequelize, Sequelize);
db.collection = require("./collection.model.js")(sequelize, Sequelize);

db.genre.belongsToMany(db.movie, {
  through: "movie_genres",
  foreignKey: "genreId",
  otherKey: "movieId",
});
db.movie.belongsToMany(db.genre, {
  through: "movie_genres",
  foreignKey: "movieId",
  otherKey: "genreId",
});

db.review.belongsTo(db.movie, {
  as: "movie_review",
  foreignKey: "movieId",
});
db.movie.hasMany(db.review, {
  as: "movie_reviews",
});

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

db.cast.belongsToMany(db.movie, {
  through: { model: MovieCast, unique: false },
});
db.movie.belongsToMany(db.cast, {
  through: { model: MovieCast, unique: false },
});

db.collection.belongsToMany(db.movie, {
  through: "movie_collections",
  foreignKey: "collectionId",
  otherKey: "movieId",
});
db.movie.belongsToMany(db.collection, {
  through: "movie_collections",
  foreignKey: "movieId",
  otherKey: "collectionId",
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
db.ROLES = ["user", "admin", "moderator"];

db.review.belongsTo(db.user, {
  as: "user_review",
  foreignKey: "userId",
});
db.user.hasMany(db.review, {
  as: "user_reviews",
});

module.exports = db;
