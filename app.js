import express from "express";
import cors from "cors";
import morgan from "morgan";
import contactsRouter from "./routes/contactsRouter.js";
import { connectDB } from "./db/sequelize.js"; // імпортуємо підключення

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB(); // Підключаємо базу перед стартом сервера
  app.listen(PORT, () => {
    console.log(`Server is running. Use our API on port: ${PORT}`);
  });
};

startServer();
