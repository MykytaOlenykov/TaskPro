const { Router } = require("express");

const {
  validateBody,
  authenticate,
  isValidObjectId,
} = require("../../middlewares");
const { validationSchemes } = require("../../models/column");
const ctrl = require("../../controllers/columns");

const router = Router();

router.post(
  "/",
  authenticate,
  validateBody(validationSchemes.createColumn),
  ctrl.create
);

router.put(
  "/:id",
  authenticate,
  isValidObjectId,
  validateBody(validationSchemes.updateColumn),
  ctrl.updateById
);

router.delete("/:id", authenticate, isValidObjectId, ctrl.deleteById);

module.exports = router;
