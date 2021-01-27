import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import axios from "axios";
import { User } from "src/users/interfaces/user.entity";
import { UsersService } from "src/users/users.service";
import { Film } from "./interfaces/film.interface";


@Injectable()
export class FilmsService {
  constructor(private usersService: UsersService) { }

    getCurrentHeroUrl(heroId: number): string {
        return `${process.env.PEOPLE_URL}${heroId}/`
    }

    async getFilmUrlsByHero(heroUrl: string): Promise<string[]>{
        return await axios.get(heroUrl).then(response => {
            return response.data.films
        }).catch((err: Error) => new BadRequestException(err));
    }

    async getFilmsByCurrentUser(userEmail: string): Promise<Film[]> {
        const dbUser: User = await this.usersService.getUserByEmail(userEmail);
        const currentHeroUrl: string = this.getCurrentHeroUrl(dbUser.heroId);
        const filmUrls: string[] = await this.getFilmUrlsByHero(currentHeroUrl);
        if(filmUrls.length < 1) {
            return [];
        };
        const filmData: Film[] = await Promise.all([...filmUrls.map(async (filmUrl: string)=> {
            return await axios.get(filmUrl).then((response => response.data)).catch((err: Error) => new BadRequestException(err));
        })]).then((userFilms: Film[]) => userFilms);
        return filmData;
    }

    async getFilmById(filmId: number, userEmail: string): Promise<Film | Error> {
        const dbUser: User = await this.usersService.getUserByEmail(userEmail);
        const expectedFilmUrl: string = `${process.env.FILMS_URL}${filmId}/`;
        const currentHeroUrl: string = this.getCurrentHeroUrl(dbUser.heroId);
        const filmUrls: string[] = await this.getFilmUrlsByHero(currentHeroUrl);
        if(filmUrls.length < 1) {
            return new UnauthorizedException("No access to selected film");
        };
        const isFilmAccessible: boolean = filmUrls.includes(expectedFilmUrl);
        if(isFilmAccessible)
            return await axios.get(expectedFilmUrl).then(response => response.data).catch((err: Error) => new BadRequestException(err)); 
        else
            return new UnauthorizedException("No access to selected film");
    }
}