// src/db/sequelize.js

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); 

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD, PG_SSL } =
  process.env;

const sequelize = new Sequelize(PG_DATABASE, PG_USER, PG_PASSWORD, {
  host: PG_HOST,
  port: PG_PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl:
      PG_SSL === "true" ? { require: true, rejectUnauthorized: false } : false,
  },
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection successful");

    // Створює відсутні таблиці відповідно до визначених моделей
    await sequelize.sync();
    console.log("✅ All models were synchronized successfully.");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };
