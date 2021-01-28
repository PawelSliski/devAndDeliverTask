import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import axios from "axios";
import { User } from "src/users/interfaces/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class CommonsService<T> {
  constructor(private usersService: UsersService) { }

    getHeroUrl(heroId: number): string {
        return `${process.env.PEOPLE_URL}${heroId}/`
    }

    envValueDictionary(value: string) {
        switch(value){
            case "people":
                return "PEOPLE_URL"
            case "films":
                return "FILMS_URL"
            case "species":
                return "SPECIES_URL"
            case "vehicles":
                return "VEHICLES_URL"
            case "starships":
                return "STARSHIPS_URL"
            case "homeworld":
                return "PLANETS_URL"
        }
    }

    async getUrlsByHero(url: string, value: string): Promise<string[]>{
        return await axios.get(url).then(response => {
            return response.data[value]
        }).catch((err: Error) => new BadRequestException(err));
    }

    async getValueByCurrentUser(userEmail: string, value: string): Promise<T[]> {
        const dbUser: User = await this.usersService.getUserByEmail(userEmail);
        const currentHeroUrl: string = this.getHeroUrl(dbUser.heroId);
        const urls: string[] = await this.getUrlsByHero(currentHeroUrl, value);
        let resUrls = typeof urls !== "object" ? [urls] : urls;
        if(resUrls.length < 1) {
            return [];
        };
        const responseData = await Promise.all([...resUrls.map(async (targetUrl: string)=> {
            return await axios.get(targetUrl).then((response => response.data)).catch((err: Error) => new BadRequestException(err));
        })]).then((userResponseData) => userResponseData);
        console.log(responseData);
        return responseData;
    }

    async getSelectedValueById(id: number, userEmail: string, value: string): Promise<T | Error> {
        const dbUser: User = await this.usersService.getUserByEmail(userEmail);
        const urlType = this.envValueDictionary(value);
        const expectedUrl: string = `${process.env[urlType]}${id}/`;
        const heroUrl: string = this.getHeroUrl(dbUser.heroId);
        const urls: string[] = await this.getUrlsByHero(heroUrl, value);
        if(urls.length < 1) {
            return new UnauthorizedException(`No access to selected ${value}`);
        };
        const isValueAccessible: boolean = urls.includes(expectedUrl);
        if(isValueAccessible)
            return await axios.get(expectedUrl).then(response => response.data).catch((err: Error) => new BadRequestException(err)); 
        else
            return new UnauthorizedException(`No access to selected ${value}`);
    }
}