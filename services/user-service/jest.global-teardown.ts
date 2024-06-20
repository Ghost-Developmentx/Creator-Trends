import sequelize from "./src/config/db";

module.exports = async () => {
  await sequelize.close();
  console.log("Global teardown: Database connection closed");
};
