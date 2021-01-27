import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { SpeciesController } from "./species.controller";
import { SpeciesService } from "./species.service";

@Module({
  controllers: [SpeciesController],
  imports: [UsersModule],
  providers: [SpeciesService]
})
export class SpeciesModule {}