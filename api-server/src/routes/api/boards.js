const { Router } = require("express");

const { validateBody, authenticate, isValidId } = require("../../middlewares");
const { validationSchemes } = require("../../models/board");
const ctrl = require("../../controllers/boards");

const router = Router();

router.get("/", authenticate, ctrl.getAll);

router.post(
  "/",
  authenticate,
  validateBody(validationSchemes.board),
  ctrl.create
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(validationSchemes.board),
  ctrl.updateById
);

router.delete("/:id", authenticate, (_, res) => {
  res.json({ message: "In work" });
});

module.exports = router;