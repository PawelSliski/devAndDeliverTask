import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { User } from "../users/interfaces/user.entity";
import { JwtPayload } from "./interfaces/jwtPayload.interface";

@Injectable()
export class AuthService {
    constructor(public usersService: UsersService, private jwtService: JwtService) { }

    isPasswordCorrect(password: string, passwordToVerify: string) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, passwordToVerify,
                function (error: Error, response: boolean) {
                    if (error) return reject(new UnauthorizedException(401, "Incorrect credentials"));
                    resolve(response)
                })
        });
    }

    async login(user: User): Promise<JwtPayload | Error> {
        const userToVerify = await this.usersService.getUserByEmail(user.email);
        if(!userToVerify)
            return new BadRequestException("Incorrect credentials");
        if (await this.isPasswordCorrect(user.password, userToVerify.password))
            return this.createJwtPayload(userToVerify);
    }

    createJwtPayload(user: User): JwtPayload {
        const jwt = this.jwtService.sign({email: user.email});
        user.password = null;
        return {
            user,
            token: jwt
        }
    }
}
