import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  googleId: {
    type: DataTypes.STRING,
  },
  facebookId: {
    type: DataTypes.STRING,
  },
});

export default User;
