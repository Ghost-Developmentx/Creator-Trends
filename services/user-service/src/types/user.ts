// src/types/user.ts
import { Model } from "sequelize";

export interface IUser {
  id?: number;
  email: string;
  password?: string;
  googleId?: string;
  facebookId?: string;
}
