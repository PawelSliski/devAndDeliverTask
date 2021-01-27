import { Document } from "../../document.interface";

export interface User extends Document {
  email: string;
  password: string;
  heroId: number;
}