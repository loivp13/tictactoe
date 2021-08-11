const bcrypt = require("bcrypt");
const { saltRounds } = require("../config/db.config");
module.exports = (sequelize, Sequelize) => {
  //create columns with ids
  // ***NOTE*** createdAt, updatedAt are generated automatically
  //CRUD functions are prebaked in squelize
  const User = sequelize.define(
    "user",
    {
      userId: {
        field: "user_id",
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1],
            msg: "First name is required.",
          },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1],
            msg: "Last name is required.",
          },
        },
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          msg: "Username is already taken",
        },
        validate: {
          len: {
            args: [6],
            msg: "Username needs a minimum of 6 characters.",
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6],
            msg: "Password needs a minimum of 6 characters.",
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          msg: "This email has already registered.",
        },
        validate: {
          isEmail: {
            msg: "Email format is incorrect.",
          },
        },
      },
      resetToken: {
        type: Sequelize.STRING,
      },
      fullName: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${this.firstName}${this.lastName}`;
        },
        set(val) {
          throw new Error("This is a virtual field!");
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(saltRounds, "a");
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(saltRounds, "a");
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );

  User.prototype.validatePassword = async function (password) {
    console.log(this.password);
    console.log(password);
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
