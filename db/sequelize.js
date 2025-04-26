import { Sequelize } from "sequelize";
import dotenv from "dotenv";

import User from "../models/users.js";
import Contact from "../models/contact.js";

dotenv.config();

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD, PG_SSL } =
  process.env;

const sequelize = new Sequelize(PG_DATABASE, PG_USER, PG_PASSWORD, {
  host: PG_HOST,
  port: PG_PORT,
  dialect: "postgres",
  dialectOptions:
    PG_SSL === "true"
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {},
  logging: false,
});

User.hasMany(Contact, { foreignKey: "owner", as: "contacts" });
Contact.belongsTo(User, { foreignKey: "owner", as: "ownerInfo" });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection successful");

    await User.sync();
    await Contact.sync();
    console.log("✅ All models were synchronized successfully.");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };
