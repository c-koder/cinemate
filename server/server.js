const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Cinemate Server-Side" });
});

const db = require("./app/models");
const Role = db.role;
db.sequelize.sync().then(() => {
  initial();
});

require("./app/routes/movie.routes")(app);
require("./app/routes/genre.routes")(app);
require("./app/routes/cast.routes")(app);
require("./app/routes/review.routes")(app);
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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
