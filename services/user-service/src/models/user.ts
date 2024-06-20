import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { IUser } from "../types/user"; // Import the interface if you plan to use it

interface UserAttributes extends IUser {
  id: number; // Ensure id is included for model attributes
}

// Define the creation attributes without id, since it will be auto-generated
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public password?: string;
  public googleId?: string;
  public facebookId?: string;
}

// Initialize the model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
  },
  {
    sequelize,
    tableName: "Users", // Explicitly set the table name
    modelName: "User", // Explicitly set the model name
  },
);

export default User;
