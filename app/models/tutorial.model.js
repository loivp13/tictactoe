module.exports = (sequelize, Sequelize) => {
  //create columns with ids
  // ***NOTE*** createdAt, updatedAt are generated automatically
  //CRUD functions are prebaked in squelize
  const Tutorial = sequelize.define("tutorial", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Tutorial;
};
