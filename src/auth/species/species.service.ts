import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import axios from "axios";
import { User } from "src/users/interfaces/user.entity";
import { UsersService } from "src/users/users.service";
import { Species } from "./interfaces/species.interface";


@Injectable()
export class SpeciesService {
  constructor(private usersService: UsersService) { }

    getCurrentHeroUrl(heroId: number): string {
        return `${process.env.PEOPLE_URL}${heroId}/`
    }

    async getSpeciesUrlsByHero(heroUrl: string): Promise<string[]>{
        return await axios.get(heroUrl).then(response => {
            return response.data.species
        }).catch((err: Error) => new BadRequestException(err));
    }

    async getSpeciesByCurrentUser(userEmail: string): Promise<Species[]> {
        const dbUser: User = await this.usersService.getUserByEmail(userEmail);
        const currentHeroUrl: string = this.getCurrentHeroUrl(dbUser.heroId);
        const speciesUrls: string[] = await this.getSpeciesUrlsByHero(currentHeroUrl);
        if(speciesUrls.length < 1) {
            return [];
        };
        const speciesData: Species[] = await Promise.all([...speciesUrls.map(async (speciesUrl: string)=> {
            return await axios.get(speciesUrl).then((response => response.data)).catch((err: Error) => new BadRequestException(err));
        })]).then((userSpecies: Species[]) => userSpecies);
        return speciesData;
    }

    async getSpeciesById(speciesId: number, userEmail: string): Promise<Species | Error> {
        const dbUser: User = await this.usersService.getUserByEmail(userEmail);
        const expectedSpeciesUrl: string = `${process.env.SPECIES_URL}${speciesId}/`;
        const currentHeroUrl: string = this.getCurrentHeroUrl(dbUser.heroId);
        const speciesUrls: string[] = await this.getSpeciesUrlsByHero(currentHeroUrl);
        if(speciesUrls.length < 1) {
            return new UnauthorizedException("No access to selected species");
        };
        const isSpeciesAccessible: boolean = speciesUrls.includes(expectedSpeciesUrl);
        if(isSpeciesAccessible)
            return await axios.get(expectedSpeciesUrl).then(response => response.data).catch((err: Error) => new BadRequestException(err)); 
        else
            return new UnauthorizedException("No access to selected species");
    }
}