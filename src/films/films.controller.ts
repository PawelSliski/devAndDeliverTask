import { Controller, Get, Headers, Param } from "@nestjs/common";
import jwt_decode from "jwt-decode";
import { User } from "src/users/interfaces/user.entity";
import { FilmsService } from "./films.service";
import { Film } from "./interfaces/film.interface";

@Controller("films")
export class FilmsController {
    constructor(private filmsService: FilmsService) {}
    
    @Get()
    async getFilms(@Headers() headers): Promise<Film[]> {
        const user: User = jwt_decode(headers.authorization);
        return await this.filmsService.getFilmsByCurrentUser(user.email);
    }

    @Get("/:filmId")
    async getFilmById(
        @Param("filmId") filmId: number,
        @Headers() headers
    ): Promise<Film | Error> {
        const user: User = jwt_decode(headers.authorization);
        return await this.filmsService.getFilmById(filmId, user.email); 
    }
}