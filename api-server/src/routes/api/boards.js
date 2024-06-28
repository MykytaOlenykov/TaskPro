const { Router } = require("express");

const {
  validateBody,
  authenticate,
  isValidObjectId,
} = require("../../middlewares");
const { validationSchemes } = require("../../models/board");
const ctrl = require("../../controllers/boards");

const router = Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidObjectId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(validationSchemes.board),
  ctrl.create
);

router.put(
  "/:id",
  authenticate,
  isValidObjectId,
  validateBody(validationSchemes.board),
  ctrl.updateById
);

router.delete("/:id", authenticate, isValidObjectId, ctrl.deleteById);

module.exports = router;
