import { Model } from "mongoose";
import { User } from "src/users/interfaces/user.entity";

export interface JwtPayload {
    user: User;
    token: string;
}