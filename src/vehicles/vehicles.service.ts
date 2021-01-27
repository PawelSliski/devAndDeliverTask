import { Injectable } from "@nestjs/common";
import { Vehicle } from "./interfaces/vehicles.interface";
import { CommonsService } from "../commonMethods";

@Injectable()
export class VehiclesService {
  constructor(private commonMethods: CommonsService<Vehicle>) { }

    async getVehiclesByCurrentUser(userEmail: string): Promise<Vehicle[]> {
        return this.commonMethods.getValueByCurrentUser(userEmail, "vehicles");
    }

    async getVehiclesById(vehicleId: number, userEmail: string): Promise<Vehicle | Error> {
        return this.commonMethods.getSelectedValueById(vehicleId, userEmail, "vehicles");
    }
}