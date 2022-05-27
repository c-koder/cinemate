const { authJwt } = require("../middleware");
module.exports = function (app) {
  const recommendation = require("../controllers/recommendation.controller.js");
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/recommendations/:id",
    [authJwt.verifyToken, authJwt.isUser],
    recommendation.findRec
  );

  app.post(
    "/api/recommendations/",
    [authJwt.verifyToken, authJwt.isUser],
    recommendation.create
  );
};
