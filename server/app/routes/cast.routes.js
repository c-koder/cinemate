const { authJwt } = require("../middleware");
module.exports = function (app) {
  const cast = require("../controllers/cast.controller.js");
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // app.get("/api/cast/", cast.findAll);
  // app.get("/api/cast/:id", cast.findOne);
  app.get("/api/moviecast", cast.findAll);
  app.post("/api/cast/", cast.create);
  app.put("/api/cast/:id", cast.update);
  // app.put(
  //   "/api/cast/:id",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   cast.update
  // );
  // app.delete(
  //   "/api/cast/:id",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   cast.delete
  // );
  // app.delete(
  //   "/api/cast/",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   cast.deleteAll
  // );
};
