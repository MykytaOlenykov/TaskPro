const { Router } = require("express");

const router = Router();

router.post("/register", (_, res) => {
  res.json({ message: "In work" });
});

router.post("/login", (_, res) => {
  res.json({ message: "In work" });
});

router.post("/logout", (_, res) => {
  res.json({ message: "In work" });
});

module.exports = router;
