var router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ text: "hit" });
});

module.exports = router;
