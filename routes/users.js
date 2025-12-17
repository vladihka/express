const express = require("express");
const router = express.Router();

// /users
router.get("/", (req, res) => {
  res.send("GET users");
});

router.post("/", (req, res) => {
  res.send("POST users");
});

// /users/:id
router.get("/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});


module.exports = router;
