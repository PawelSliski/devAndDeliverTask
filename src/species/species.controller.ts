import { Controller, Get, Headers, Param } from "@nestjs/common";
import jwt_decode from "jwt-decode";
import { User } from "src/users/interfaces/user.entity";
import { Species } from "./interfaces/species.interface";
import { SpeciesService } from "./species.service";

@Controller("species")
export class SpeciesController {
    constructor(private speciesService: SpeciesService) {}
    
    @Get()
    async getSpecies(@Headers() headers): Promise<Species[]> {
        const user: User = jwt_decode(headers.authorization);
        return await this.speciesService.getSpeciesByCurrentUser(user.email);
    }

    @Get("/:speciesId")
    async getSpeciesById(
        @Param("speciesId") speciesId: number,
        @Headers() headers
    ): Promise<Species | Error> {
        const user: User = jwt_decode(headers.authorization);
        return await this.speciesService.getSpeciesById(speciesId, user.email); 
    }
}