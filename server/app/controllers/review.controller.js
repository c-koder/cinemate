const db = require("../models");
const Review = db.review;

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Review.create(req.body.params)
    .then((review) => {
      res.send(review);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding review to movie.",
      });
    });
};
