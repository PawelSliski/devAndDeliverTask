import { Module } from "@nestjs/common";
import { CommonsService } from "src/commonMethods";
import { UsersModule } from "src/users/users.module";
import { VehiclesController } from "./vehicles.controller";
import { VehiclesService } from "./vehicles.service";

@Module({
  controllers: [VehiclesController],
  imports: [UsersModule],
  providers: [VehiclesService, CommonsService]
})
export class VehiclesModule {}