import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import User from "../models/users.js";

const { JWT_SECRET, JWT_EXPIRES_IN = "1h" } = process.env;

export const register = async ({ email, password }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    const err = new Error("Email in use");
    err.status = 409;
    throw err;
  }
  const hash = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, {s: "250", d: "identicon",});
  const user = await User.create({ email, password: hash, avatarURL, });
  return {
    email: user.email,
    subscription: user.subscription,
    avatarURL: user.avatarURL,
  };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;

  const payload = { id: user.id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  user.token = token;
  await user.save();

  return {
    token,
    user: { email: user.email, subscription: user.subscription, avatarURL: user.avatarURL, },
  };
};

export const logout = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) return false;
  user.token = null;
  await user.save();
  return true;
};
