module.exports = {
  HOST: "eu-cdbr-west-02.cleardb.net",
  USER: "ba9a0159350a9d",
  PASSWORD: "7e899e7c",
  DB: "heroku_0116e7bf2d354fc",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
