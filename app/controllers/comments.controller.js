const db = require("../models");
const Comments = db.Comments;
const Op = db.Sequelize.Op;

//creating Comments and comments functions
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tag
  const comment = {
    name: req.body.name,
    text: req.body.text,
  };

  // Save Comments in the database
  Comments.create(comment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the comment.",
      });
    });
};
// Update an object
// Update a Comments identified by the id in the request:
exports.update = (req, res) => {
  const id = req.params.id;

  Comments.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comments was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Comments with id=${id}. Maybe Comments was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Comments with id=" + id,
      });
    });
};

//Retrieve a single object
// Find a single Comments with an id:
exports.findOne = (req, res) => {
  const id = req.params.id;

  Comments.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Comments with id=" + id,
      });
    });
};

// get all Comments include comments
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Comments.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Comments.",
      });
    });
};

// Delete an object
// Delete a Comments with the specified id:

exports.delete = (req, res) => {
  const id = req.params.id;

  Comments.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Comments with id=${id}. Maybe comment was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Comments with id=" + id,
      });
    });
};

// Delete all objects
// Delete all Comments from the database:

exports.deleteAll = (req, res) => {
  Comments.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Comments were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Comments.",
      });
    });
};

// Find all objects by condition
// Find all Comments with published = true:

exports.findAllPublished = (req, res) => {
  Comments.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Comments.",
      });
    });
};
