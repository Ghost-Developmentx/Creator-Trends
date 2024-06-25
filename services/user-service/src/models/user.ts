import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "@config/db";

// Define the model attributes
interface UserAttributes {
  id: number;
  email: string;
  password: string;
  googleId?: string;
  facebookId?: string;
  username?: string; // Add this line
}

// Define the creation attributes without id, since it will be auto-generated
interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "googleId" | "facebookId" | "username"
  > {} // Add "username" here

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
  public username?: string; // Add this line
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
    username: {
      // Add this block
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
