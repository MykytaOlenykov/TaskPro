const { Router } = require("express");

const { validateBody } = require("../../middlewares");
const { validationSchemes } = require("../../models/user");
const ctrl = require("../../controllers/users");

const router = Router();

router.post("/register", validateBody(validationSchemes.user), ctrl.register);

router.post("/login", (_, res) => {
  res.json({ message: "In work" });
});

router.post("/logout", (_, res) => {
  res.json({ message: "In work" });
});

module.exports = router;
