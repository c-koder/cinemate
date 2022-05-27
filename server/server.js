const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const corsOptions = {
  origin: "https://cinemate-app.netlify.app",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const db = require("./app/models");
const Role = db.role;
db.sequelize.sync().then(() => {
  initial();
});

require("./app/routes/movie.routes")(app);
require("./app/routes/genre.routes")(app);
require("./app/routes/cast.routes")(app);
require("./app/routes/review.routes")(app);
require("./app/routes/recommendation.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

function initial() {
  Role.findOrCreate({
    where: {
      id: 1,
      name: "user",
    },
  });

  Role.findOrCreate({
    where: {
      id: 2,
      name: "moderator",
    },
  });

  Role.findOrCreate({
    where: {
      id: 3,
      name: "admin",
    },
  });
}

app.use(function (err, req, res, next) {
  console.error("-----------------------err.stack--------------------------");
  console.log(err);
  console.error("-----------------------err.stack--------------------------");
  if (err.message) {
    success(res, err.message, 400)(err);
  } else {
    res.status(500).json("Oops, something went terribly wrong!");
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}.`);
});
