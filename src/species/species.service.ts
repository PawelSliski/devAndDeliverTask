import { Injectable } from "@nestjs/common";
import { Species } from "./interfaces/species.interface";
import { CommonsService } from "../commonMethods";

@Injectable()
export class SpeciesService {
  constructor(private commonMethods: CommonsService<Species>) { }

    async getSpeciesByCurrentUser(userEmail: string): Promise<Species[]> {
        return this.commonMethods.getValueByCurrentUser(userEmail, "species");
    }

    async getSpeciesById(speciesId: number, userEmail: string): Promise<Species | Error> {
        return this.commonMethods.getSelectedValueById(speciesId, userEmail, "species");
    }
}