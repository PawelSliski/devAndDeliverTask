import { Module } from "@nestjs/common";
import { CommonsService } from "src/commonMethods";
import { UsersModule } from "src/users/users.module";
import { FilmsController } from "./films.controller";
import { FilmsService } from "./films.service";

@Module({
  controllers: [FilmsController],
  imports: [UsersModule],
  providers: [FilmsService, CommonsService]
})
export class FilmsModule {}