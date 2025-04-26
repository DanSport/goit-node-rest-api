import sequelize from "./sequelize.js";
import Contact from "./models/Contact.js";

const initDb = async () => {
  try {
    await sequelize.authenticate(); // Перевірка підключення
    console.log("✅ Connection has been established successfully.");

    await Contact.sync(); // Створює таблицю, якщо немає
    console.log("✅ Contact table created (or already exists).");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
  } finally {
    await sequelize.close(); // Закриваємо з'єднання
  }
};

initDb();
