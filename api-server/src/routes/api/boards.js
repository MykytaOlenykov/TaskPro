const { Router } = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const router = Router();

router.get("/", authenticate, (_, res) => {
  res.json({ message: "In work" });
});

router.post("/", authenticate, (_, res) => {
  res.json({ message: "In work" });
});

router.put("/:id", authenticate, (_, res) => {
  res.json({ message: "In work" });
});

router.delete("/:id", authenticate, (_, res) => {
  res.json({ message: "In work" });
});

module.exports = router;
