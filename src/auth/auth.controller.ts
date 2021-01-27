import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "src/users/interfaces/user.entity";
import { JwtPayload } from "./interfaces/jwtPayload.interface";
import { Public } from "src/public.decorator";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post("/login") 
    async login(@Body() user: User): Promise<JwtPayload | Error>{
        return await this.authService.login(user);
    }

}