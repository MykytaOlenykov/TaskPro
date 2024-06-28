const { Router } = require("express");

const {
  validateBody,
  authenticate,
  isValidObjectId,
} = require("../../middlewares");
const { validationSchemes } = require("../../models/task");
const ctrl = require("../../controllers/tasks");

const router = Router();

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
  ctrl.updateById
);

router.patch(
  "/:id",
  authenticate,
  isValidObjectId,
  validateBody(validationSchemes.changeTaskColumnId),
  ctrl.updateById
);

router.delete("/:id", authenticate, isValidObjectId, ctrl.deleteById);

router.get("/priorities", authenticate, ctrl.getPriorities);

module.exports = router;
