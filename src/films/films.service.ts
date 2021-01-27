import { Injectable } from "@nestjs/common";
import { Film } from "./interfaces/film.interface";
import { CommonsService } from "../commonMethods";

@Injectable()
export class FilmsService {
    constructor(private commonMethods: CommonsService<Film>) { }

    async getFilmsByCurrentUser(userEmail: string): Promise<Film[]> {
        return this.commonMethods.getValueByCurrentUser(userEmail, "films")
    }

    async getFilmById(filmId: number, userEmail: string): Promise<Film | Error> {
        return this.commonMethods.getSelectedValueById(filmId, userEmail, "films");
    }
}