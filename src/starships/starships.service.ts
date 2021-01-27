import { Injectable } from "@nestjs/common";
import { Starship } from "./interfaces/starship.interface";
import { CommonsService } from "../commonMethods";

@Injectable()
export class StarshipsService {
  constructor(private commonMethods: CommonsService<Starship>) { }

    async getStarshipsByCurrentUser(userEmail: string): Promise<Starship[]> {
        return this.commonMethods.getValueByCurrentUser(userEmail, "starships");
    }

    async getStarshipsById(starshipId: number, userEmail: string): Promise<Starship | Error> {
        return this.commonMethods.getSelectedValueById(starshipId, userEmail, "starships");
    }
}