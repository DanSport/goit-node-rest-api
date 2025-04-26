import jwt from "jsonwebtoken";
import User from "../models/users.js";
import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user || user.token !== token) {
      throw HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};
