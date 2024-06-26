const { Router } = require("express");
const Joi = require("joi");

const {
  validateBody,
  validateQuery,
  authenticate,
  isValidObjectId,
} = require("../../middlewares");
const { isValidObjectId: isValidObjectIdHelper } = require("../../helpers");
const { validationSchemes } = require("../../models/task");
const ctrl = require("../../controllers/tasks");

const router = Router();

const querySchema = Joi.object({
  column_id: Joi.string().custom(isValidObjectIdHelper).required(),
});

router.get("/", authenticate, validateQuery(querySchema), ctrl.getAll);

router.post(
  "/",
  authenticate,
  validateBody(validationSchemes.createTask),
  ctrl.create
);

router.put(
  "/:id",
  authenticate,
  isValidObjectId,
  validateBody(validationSchemes.updateTask),
  (_, res) => {
    res.json({ message: "In work" });
  }
);

router.delete("/:id", authenticate, isValidObjectId, (_, res) => {
  res.json({ message: "In work" });
});

router.get("/priorities", authenticate, (_, res) => {
  res.json({ message: "In work" });
});

module.exports = router;
