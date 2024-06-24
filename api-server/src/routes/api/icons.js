const { Router } = require("express");

const { authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/icons");

const router = Router();

router.get("/", authenticate, ctrl.getAll);

module.exports = router;
