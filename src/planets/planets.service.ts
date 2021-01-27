import { Injectable } from "@nestjs/common";
import { Planet } from "./interfaces/planet.interface";
import { CommonsService } from "../commonMethods";

@Injectable()
export class PlanetsService {
  constructor(private commonMethods: CommonsService<Planet>) { }

    async getPlanetsByCurrentUser(userEmail: string): Promise<Planet[]> {
        return this.commonMethods.getValueByCurrentUser(userEmail, "homeworld");
    }

    async getPlanetsById(planetId: number, userEmail: string): Promise<Planet | Error> {
        return this.commonMethods.getSelectedValueById(planetId, userEmail, "homeworld");
    }
}