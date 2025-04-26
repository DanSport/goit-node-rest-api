import sequelize from "./sequelize.js";

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Успішне підключення до бази даних через Sequelize!");
  } catch (error) {
    console.error("❌ Помилка підключення до бази даних:", error.message);
  } finally {
    await sequelize.close();
  }
};

testDbConnection();
