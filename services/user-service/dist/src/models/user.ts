import { DataTypes, Model, Optional, FindOptions } from "sequelize";
import sequelize from "../config/db";

// Define the model attributes
interface UserAttributes {
  id: number;
  email: string;
  password: string;
  googleId?: string;
  facebookId?: string;
}

// Define the creation attributes without id, since it will be auto-generated
interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "googleId" | "facebookId"> {}

// User model class definition
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
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
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebookId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Users",
    modelName: "User",
    timestamps: true,
  },
);

export default User;
