const db = require("../models");
const Tags = db.tags;
const Op = db.Sequelize.Op;

//creating Tags and comments functions
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tag
  const tag = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save Tags in the database
  Tags.create(tag)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Tag.",
      });
    });
};
// Update an object
// Update a Tags identified by the id in the request:
exports.update = (req, res) => {
  const id = req.params.id;

  Tags.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tags was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tags with id=${id}. Maybe Tags was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tags with id=" + id,
      });
    });
};

//Retrieve a single object
// Find a single Tags with an id:
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tags.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tag with id=" + id,
      });
    });
};

// get all Tags include comments
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Tags.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tags.",
      });
    });
};

// Delete an object
// Delete a Tags with the specified id:

exports.delete = (req, res) => {
  const id = req.params.id;

  Tags.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tags was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tags with id=${id}. Maybe Tags was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tags with id=" + id,
      });
    });
};

// Delete all objects
// Delete all Tags from the database:

exports.deleteAll = (req, res) => {
  Tags.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tags were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Tags.",
      });
    });
};

// Find all objects by condition
// Find all Tags with published = true:

exports.findAllPublished = (req, res) => {
  Tags.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tags.",
      });
    });
};
