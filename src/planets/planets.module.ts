import { Module, CacheModule } from "@nestjs/common";
import { CommonsService } from "src/commonMethods";
import { UsersModule } from "src/users/users.module";
import { PlanetsController } from "./planets.controller";
import { PlanetsService } from "./planets.service";

@Module({
  controllers: [PlanetsController],
  imports: [
    UsersModule,
    CacheModule.register({ ttl: 86400 }) //24h
  ],
  providers: [PlanetsService, CommonsService]
})
export class PlanetsModule {}