import { Controller, Get, Post, Body } from "@nestjs/common";
import { JwtPayload } from "src/auth/interfaces/jwtPayload.interface";
import { Public } from "src/public.decorator";
import { User } from "./interfaces/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    @Public()
    @Post("/register") 
    async create(@Body() user: User): Promise<JwtPayload | Error> {
        return await this.usersService.register(user);
    }
}