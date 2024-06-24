const { Router } = require("express");

const { validateBody, authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/boards");

const router = Router();

router.get("/", authenticate, (_, res) => {
  res.json({ message: "In work" });
});

router.post("/", authenticate, ctrl.create);

router.put("/:id", authenticate, (_, res) => {
  res.json({ message: "In work" });
});

router.delete("/:id", authenticate, (_, res) => {
  res.json({ message: "In work" });
});

module.exports = router;
