const { Router } = require("express");

const ctrl = require("../../controllers/icons");

const router = Router();

router.get("/", ctrl.getAll);

module.exports = router;
