import { Controller, Get, Headers, Param, UseInterceptors, CacheInterceptor } from "@nestjs/common";
import jwt_decode from "jwt-decode";
import { User } from "src/users/interfaces/user.entity";
import { Planet } from "./interfaces/planet.interface";
import { PlanetsService } from "./planets.service";

@Controller("planets")
@UseInterceptors(CacheInterceptor)
export class PlanetsController {
    constructor(private planetsService: PlanetsService) {}
    
    @Get()
    async getPlanets(@Headers() headers): Promise<Planet[]> {
        const user: User = jwt_decode(headers.authorization);
        return await this.planetsService.getPlanetsByCurrentUser(user.email);
    }

    @Get("/:planetId")
    async getPlanetsById(
        @Param("planetId") planetId: number,
        @Headers() headers
    ): Promise<Planet | Error> {
        const user: User = jwt_decode(headers.authorization);
        return await this.planetsService.getPlanetsById(planetId, user.email); 
    }
}