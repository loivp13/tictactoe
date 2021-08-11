const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.users;
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const {
  registerEmailParams,
  forgotEmailPasswordParams,
} = require("../helpers/aws-email.helper");
const AWS = require("aws-sdk");

//config aws
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

//aws simple email service
const ses = new AWS.SES({ apiVersion: "2010-12-1" });

exports.register = (req, res) => {
  const { firstName, lastName, username, password, email } = req.body;
  User.findOne({
    where: {
      email,
    },
  }).then((data) => {
    //if data exist email or username is taking
    if (data) {
      console.log(data);
      res.status(400).json({
        message: "email or password is already taken",
      });
    }

    //if data does not exist send double optin email
    const token = jwt.sign(
      { firstName, lastName, username, password, email },
      process.env.JWT_ACCOUNT_ACTIVATION
    );
    //send email returning a promise
    const sendEmailOnRegister = ses
      .sendEmail(registerEmailParams(email, token))
      .promise();
    //
    sendEmailOnRegister
      .then((data) => {
        res.json({
          message: `Email has been sent to  ${email}. Follow the instructions to complete your registration.`,
          data,
        });
      })
      .catch((error) => {
        res.json({
          message: `We could not verify your email, please try again`,
          error,
        });
      });
  });
};

exports.activate = (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
    if (err) {
      console.log(err);
      return status(401).json({
        error: "Expired link. Try again",
      });
    }
  });

  const { firstName, lastName, email, password, username } = jwt.decode(token);

  //check if another email was registered
  User.findOne({ where: { email } }).then((data) => {
    if (data) {
      res.status(401).json({
        error: "Email was just taken",
      });
    }
  });

  //create new user
  User.create({
    username,
    firstName,
    lastName,
    password,
    email,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message ||
          "An error occurred while creating account. Please try again.",
      });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then(async (data) => {
      //No user was found
      if (!data) {
        return res.status(401).json({
          message: "Unable to login. Email or password is incorrect",
        });
      }

      //found user validate password
      if (!(await data.validatePassword(password))) {
        console.log("end");
        return res
          .status(401)
          .json({ message: "Unable to login. Email or password is incorrect" });
      }
      //generate JWT and send to client
      const token = jwt.sign({ userId: data.userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const { email, firstName, lastName, username } = data;
      return res.json({
        token,
        user: { email, firstName, lastName, username },
      });
    })
    .catch((err) => {
      if (err.errors) {
        res.json({
          message: err.errors[0].message,
        });
      } else {
        res.json({
          err: err,
        });
      }
    });
};
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
});

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ where: { email } })
    .then((data) => {
      //no user found
      if (!data) {
        res.status(400).json({
          message: "We could not verify your email. Please try again",
        });
      }
      //found user
      console.log(data.fullName);
      const token = jwt.sign(
        { name: data.fullName },
        process.env.JWT_RESET_PASSWORD,
        {
          expiresIn: "10min",
        }
      );
      User.update({ resetToken: token }, { where: { email } })
        .then((data) => {
          const sendEmail = ses
            .sendEmail(forgotEmailPasswordParams(email, token))
            .promise();

          sendEmail
            .then((data) => {
              return res.json({
                message: `Email has been sent to ${email}. Please follow the email's instructions to reset your password. The link will expire in 10 minutes.`,
              });
            })
            .catch((error) => {
              res.json({
                message: "An error was detected, please try again",
                error: error,
              });
            });
        })
        .catch((err) => {
          res.status(400).json({
            message: "Unable to reset your password, please try again.",
            err: err,
          });
        });
    })
    .catch((err) => {
      res.status(400).json({
        message:
          "Unable to reset your password at this time. Please try again.",
        err,
      });
    });
};

exports.resetPassword = (req, res) => {
  const { newPassword, token } = req.body;
  User.findOne({ where: { resetToken: token } })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          message: "Resetting password failed. Please try again",
        });
      }
      data
        .update(
          {
            password: newPassword,
          },
          { where: { resetToken: token } }
        )
        .then((data) => {
          res.status(200).json({
            message: "Password successfully reset",
          });
        })
        .catch((err) => {
          res.status(400).json({
            message:
              "An error occured while resetting password. Please try again.",
            err,
          });
        });
    })
    .catch((err) => {
      res.status(400).json({
        message: "An error occured while resetting password. Please try again",
        err,
      });
    });
};
