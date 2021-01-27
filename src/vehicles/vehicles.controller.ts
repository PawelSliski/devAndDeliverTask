import { Controller, Get, Headers, Param } from "@nestjs/common";
import jwt_decode from "jwt-decode";
import { User } from "src/users/interfaces/user.entity";
import { Vehicle } from "./interfaces/vehicles.interface";
import { VehiclesService } from "./vehicles.service";

@Controller("vehicles")
export class VehiclesController {
    constructor(private vehiclesService: VehiclesService) {}
    
    @Get()
    async getVehicles(@Headers() headers): Promise<Vehicle[]> {
        const user: User = jwt_decode(headers.authorization);
        return await this.vehiclesService.getVehiclesByCurrentUser(user.email);
    }

    @Get("/:vehicleId")
    async getVehiclesById(
        @Param("vehicleId") vehicleId: number,
        @Headers() headers
    ): Promise<Vehicle | Error> {
        const user: User = jwt_decode(headers.authorization);
        return await this.vehiclesService.getVehiclesById(vehicleId, user.email); 
    }
}