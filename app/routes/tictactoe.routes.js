let express = require("express");
let router = express.Router();

let returnRouter = function (io) {
  io.on("connection", (socket) => {});

  router.get("/", (req, res, next) => {
    res.json({
      message: "hit",
    });
  });

  return router;
};

module.exports = returnRouter;
