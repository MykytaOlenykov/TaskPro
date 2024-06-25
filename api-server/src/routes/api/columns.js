const { Router } = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");

const {
  validateBody,
  validateQuery,
  authenticate,
  isValidObjectId,
} = require("../../middlewares");
const { validationSchemes } = require("../../models/column");
const ctrl = require("../../controllers/columns");

const router = Router();

const querySchema = Joi.object({
  board_id: Joi.string()
    .custom((value, helpers) => {
      if (mongoose.isValidObjectId(value)) {
        return value;
      }
      return helpers.message(`\"board_id\" ${value} is not valid id`);
    })
    .required(),
});

router.get("/", authenticate, validateQuery(querySchema), ctrl.getAll);

router.post(
  "/",
  authenticate,
  isValidObjectId,
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
