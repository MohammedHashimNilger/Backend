import Router from "express";
import {
  login,
  logoutUser,
  registerUSer,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userRegisterValidator,
  userLoginValidator,
} from "../validators/index.js";
import { optionalAuth } from "../middlewares/optional-auth.middleware.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUSer);
router.route("/login").post(userLoginValidator(), validate, login);
router.route("/logout").post(optionalAuth, logoutUser);

export default router;
