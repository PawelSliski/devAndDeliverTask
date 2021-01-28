import { Module, CacheModule } from "@nestjs/common";
import { CommonsService } from "src/commonMethods";
import { UsersModule } from "src/users/users.module";
import { SpeciesController } from "./species.controller";
import { SpeciesService } from "./species.service";

@Module({
  controllers: [SpeciesController],
  imports: [
    UsersModule,
    CacheModule.register({ ttl: 86400 }) //24h
  ],
  providers: [SpeciesService, CommonsService]
})
export class SpeciesModule {}