import sequelize from "./connection.js"; 
import User from "../models/users.js"; 
import Contact from "../models/contact.js";

User.hasMany(Contact, { foreignKey: "owner", as: "contacts" });
Contact.belongsTo(User, { foreignKey: "owner", as: "ownerInfo" });

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection successful");

    await sequelize.sync({ alter: true });
    //await sequelize.sync({ force: true }); // Use this line to drop and recreate tables
    console.log("✅ All models were synchronized (alter) successfully.");
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
    process.exit(1);
  }
};

export default initDb;
