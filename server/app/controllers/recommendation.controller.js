const db = require("../models");
const Recommendation = db.recommendation;

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Recommendation.findOne({ where: { userId: req.body.params.userId } }).then(
    (recommendation) => {
      if (recommendation) {
        recommendation
          .update(req.body.params)
          .then((recommendation) => {
            res.send(recommendation);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while updating your recommendation",
            });
          });
      } else {
        Recommendation.create(req.body.params)
          .then((recommendation) => {
            res.send(recommendation);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while saving your recommendation",
            });
          });
      }
    }
  );
};

exports.findRec = (req, res) => {
  const userId = JSON.parse(req.params.id);
  Recommendation.findOne({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Recommendation of user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Recommendation of user with id=" + userId,
      });
    });
};
