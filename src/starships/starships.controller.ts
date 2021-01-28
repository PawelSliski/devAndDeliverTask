import { Controller, Get, Headers, Param, UseInterceptors, CacheInterceptor } from "@nestjs/common";
import jwt_decode from "jwt-decode";
import { User } from "src/users/interfaces/user.entity";
import { Starship } from "./interfaces/starship.interface";
import { StarshipsService } from "./Starships.service";

@Controller("starships")
@UseInterceptors(CacheInterceptor)
export class StarshipsController {
    constructor(private starshipsService: StarshipsService) {}
    
    @Get()
    async getStarships(@Headers() headers): Promise<Starship[]> {
        const user: User = jwt_decode(headers.authorization);
        return await this.starshipsService.getStarshipsByCurrentUser(user.email);
    }

    @Get("/:starshipId")
    async getStarshipsById(
        @Param("starshipId") starshipId: number,
        @Headers() headers
    ): Promise<Starship | Error> {
        const user: User = jwt_decode(headers.authorization);
        return await this.starshipsService.getStarshipsById(starshipId, user.email); 
    }
}