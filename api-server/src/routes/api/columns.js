const { Router } = require("express");
const Joi = require("joi");

const {
  validateBody,
  validateQuery,
  authenticate,
  isValidObjectId,
} = require("../../middlewares");
const { isValidObjectId: isValidObjectIdHelper } = require("../../helpers");
const { validationSchemes } = require("../../models/column");
const ctrl = require("../../controllers/columns");

const router = Router();

const querySchema = Joi.object({
  board_id: Joi.string().custom(isValidObjectIdHelper).required(),
});

router.get("/", authenticate, validateQuery(querySchema), ctrl.getAll);

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
