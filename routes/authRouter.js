import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  currentController,
  subscriptionController,
} from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", authenticate, logoutController);
router.get("/current", authenticate, currentController);
router.patch("/subscription", authenticate, subscriptionController);

export default router;
