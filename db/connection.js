import { Sequelize } from "sequelize";
import dotenv from "dotenv";

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

export default sequelize;
