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
  validateBody(validationSchemes.column),
  (_, res) => {
    res.json({ message: "In work" });
  }
);

router.put(
  "/:id",
  authenticate,
  isValidObjectId,
  validateBody(validationSchemes.column),
  (_, res) => {
    res.json({ message: "In work" });
  }
);

router.delete("/:id", authenticate, (_, res) => {
  res.json({ message: "In work" });
});

module.exports = router;
