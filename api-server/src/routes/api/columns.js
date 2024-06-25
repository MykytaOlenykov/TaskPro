const { Router } = require("express");

const { validateBody, authenticate, isValidId } = require("../../middlewares");
const { validationSchemes } = require("../../models/column");
const ctrl = require("../../controllers/columns");

const router = Router();

router.get("/", authenticate, ctrl.getAll);

router.post(
  "/",
  authenticate,
  isValidId,
  validateBody(validationSchemes.column),
  (_, res) => {
    res.json({ message: "In work" });
  }
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(validationSchemes.column),
  (_, res) => {
    res.json({ message: "In work" });
  }
);

router.delete("/:id", authenticate, (_, res) => {
  res.json({ message: "In work" });
});

module.exports = router;
