const { Router } = require("express");

const {
  validateBody,
  authenticate,
  verifyRefreshToken,
} = require("../../middlewares");
const { validationSchemes } = require("../../models/user");
const ctrl = require("../../controllers/users");

const router = Router();

router.post("/register", validateBody(validationSchemes.user), ctrl.register);

router.post("/login", validateBody(validationSchemes.login), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/refresh", verifyRefreshToken, ctrl.refresh);

router.patch(
  "/",
  authenticate,
  validateBody(validationSchemes.theme),
  ctrl.changeTheme
);

module.exports = router;
