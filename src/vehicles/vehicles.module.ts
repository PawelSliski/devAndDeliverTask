import { Module, CacheModule } from "@nestjs/common";
import { CommonsService } from "src/commonMethods";
import { UsersModule } from "src/users/users.module";
import { VehiclesController } from "./vehicles.controller";
import { VehiclesService } from "./vehicles.service";

@Module({
  controllers: [VehiclesController],
  imports: [
    UsersModule,
    CacheModule.register({ ttl: 86400 }) //24h
  ],
  providers: [VehiclesService, CommonsService]
})
export class VehiclesModule { }