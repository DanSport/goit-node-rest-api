import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  currentController,
  subscriptionController,
  updateAvatarController,
  verifyEmailController,
  resendVerifyController,
} from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/verify", resendVerifyController); 
router.get("/verify/:verificationToken", verifyEmailController); 
router.post("/login", loginController);
router.post("/logout", authenticate, logoutController);
router.get("/current", authenticate, currentController);
router.patch("/subscription", authenticate, subscriptionController);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatarController);

export default router;
