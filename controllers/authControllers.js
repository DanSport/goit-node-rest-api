import * as authService from "../services/authService.js";
import {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} from "../schemas/authSchemas.js";
import HttpError from "../helpers/HttpError.js";
import User from "../models/users.js";
import { sendVerifyEmail } from "../services/emailService.js";
import { resendVerifyEmailSchema } from "../schemas/authSchemas.js";

export const registerController = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const user = await authService.register(req.body);
    res.status(201).json({ user });
  } catch (err) {
    next(err.status === 409 ? HttpError(409, err.message) : err);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const result = await authService.login(req.body);
    if (!result) throw HttpError(401, "Email or password is wrong");

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    const success = await authService.logout(req.user.id);
    if (!success) throw HttpError(401, "Not authorized");
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const currentController = async (req, res, next) => {
  try {
    const { email, subscription, avatarURL } = req.user;
    res.status(200).json({ email, subscription, avatarURL });
  } catch (err) {
    next(err);
  }
};

export const subscriptionController = async (req, res, next) => {
  try {
    const { error } = subscriptionSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const updated = await authService.updateSubscription(
      req.user.id,
      req.body.subscription
    );
    if (!updated) throw HttpError(404, "Not found");

    res
      .status(200)
      .json({
        email: updated.email,
        subscription: updated.subscription,
        avatarURL: updated.avatarURL,
      });
  } catch (err) {
    next(err);
  }
};

export const updateAvatarController = async (req, res, next) => {
  try {
    if (!req.file) throw HttpError(400, "No file uploaded");

    const { path: tempPath, originalname } = req.file;
    const ext = path.extname(originalname);
    const fileName = `${req.user.id}${ext}`;
    const avatarsDir = path.join(process.cwd(), "public", "avatars");
    const resultPath = path.join(avatarsDir, fileName);

    await fs.rename(tempPath, resultPath);

    const avatarURL = `/avatars/${fileName}`;
    req.user.avatarURL = avatarURL;
    await req.user.save();

    res.status(200).json({ avatarURL });
  } catch (err) {
    next(err);
  }
};
export const verifyEmailController = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({
      where: { verifyToken: verificationToken },
    });
    if (!user) throw HttpError(404, "Not found");

    if (user.verify) throw HttpError(404, "Already verified");

    user.verify = true;
    user.verifyToken = null;
    await user.save();

    res.status(200).json({ message: "Verification successful" });
  } catch (err) {
    next(err);
  }
};

export const resendVerifyController = async (req, res, next) => {
  try {
    const { error } = resendVerifyEmailSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) throw HttpError(404, "User not found");
    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    await sendVerifyEmail({ to: email, token: user.verifyToken });
    res.status(200).json({ message: "Verification email sent" });
  } catch (err) {
    next(err);
  }
};