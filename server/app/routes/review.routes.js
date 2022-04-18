const { authJwt } = require("../middleware");
module.exports = function (app) {
  const reviews = require("../controllers/review.controller.js");
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // app.get("/api/reviews/", reviews.findAll);
  app.post(
    "/api/reviews/",
    [authJwt.verifyToken, authJwt.isUser],
    reviews.create
  );
};
