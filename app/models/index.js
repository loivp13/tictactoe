// get postgres config
const dbConfig = require("../config/db.config");

//init sequelize with connection options
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  logging: false,
});

//created db object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model")(sequelize, Sequelize);
db.tutorials = require("./tutorial.model")(sequelize, Sequelize);
db.comments = require("./comment.model")(sequelize, Sequelize);
db.tags = require("./tag.model")(sequelize, Sequelize);

//make tutorial model to have a one to many relationship with comment
db.tutorials.hasMany(db.comments, { as: "comments" });
//make tutorial to have many to many relationship with tags
db.tutorials.belongsToMany(db.tags, {
  through: "tutorial_tag",
  as: "tags",
  foreignKey: "tag_id",
});
//make comment to belong to only one tutorial
db.comments.belongsTo(db.tutorials, {
  foreignKey: "tutorialId",
  as: "comments",
});
//make tag to have many to many relationship with tags
db.tags.belongsToMany(db.tutorials, {
  through: "tutorial_tag",
  as: "tags",
  foreignKey: "tutorial_id",
});

module.exports = db;
