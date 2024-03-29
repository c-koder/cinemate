const { authJwt } = require("../middleware");
module.exports = function (app) {
  const movies = require("../controllers/movie.controller.js");
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/movies/", movies.findAll);
  app.get("/api/movies/popular", movies.findPopular);
    app.get("/api/movies/recommended", movies.findRecommended);
  app.get("/api/movies/:id", movies.findOne);
  app.get("/api/movies/watchlist/:id", movies.getUserWatchlist);

  app.post("/api/movies/", movies.create);
  app.post("/api/movies/bookmark", movies.addToWatchlist);
  app.post("/api/movies/like", movies.addLiked);

  app.put(
    "/api/movies/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    movies.update
  );
  app.delete(
    "/api/movies/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    movies.delete
  );
  app.delete(
    "/api/movies/",
    [authJwt.verifyToken, authJwt.isAdmin],
    movies.deleteAll
  );
};
