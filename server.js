require("dotenv").config();
const express = require("express");
const Redis = require("ioredis");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const cors = require("cors");
let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json());

//sync db; enables Sequelize to automatically create the table according model definition
//options: force  - can force table to drop and resync
const db = require("./app/models");
let dbOptions = {};
if (process.env.ENVIRONMENT === "DEVELOPMENT") {
  dbOptions.force = true;
} else {
  dbOptions.force = false;
}

db.sequelize.sync(dbOptions).then(() => {
  console.log("drop and re-sync db");
  //Seed db if in developemnt
  if (process.env.ENVIRONMENT === "DEVELOPMENT") {
    const dbSeed = require("./app/helpers/dbSeed");
    dbSeed();
  }
});

// get all routes
let AuthRoutes = require("./app/routes/auth.routes");
let IndexRoutes = require("./app/routes/index.routes");
let TutorialRoutes = require("./app/routes/tutorial.routes");
let UserRoutes = require("./app/routes/user.routes");
app.use("/", IndexRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/tutorials", TutorialRoutes);
app.use("/api/users", UserRoutes);

//Sockets init
let socketListen = require("./app/helpers/socketListen");
const redis = new Redis(6379);
socketListen(io, redis);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
  try {
    await db.sequelize.authenticate();
    console.log(
      "---------Connection with Postgres has been established successfully.------"
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
