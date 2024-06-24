const { Router } = require("express");

const ctrl = require("../../controllers/backgrounds");

const router = Router();

router.get("/", ctrl.getAll);

module.exports = router;
