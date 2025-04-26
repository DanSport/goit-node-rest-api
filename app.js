import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";

import initDb from "./db/initDb.js";
import authRouter from "./routes/authRouter.js";
import contactsRouter from "./routes/contactsRouter.js";
import { authenticate } from "./middlewares/authenticate.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const startServer = async () => {
  await initDb();

  app.use("/api/auth", authRouter);

  app.use("/api/contacts", authenticate, contactsRouter);

  app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
  });

  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
