import { Module, CacheModule } from "@nestjs/common";
import { CommonsService } from "src/commonMethods";
import { UsersModule } from "src/users/users.module";
import { StarshipsController } from "./starships.controller";
import { StarshipsService } from "./starships.service";

@Module({
  controllers: [StarshipsController],
  imports: [
    UsersModule,
    CacheModule.register({ ttl: 86400 }) //24h
  ],
  providers: [StarshipsService, CommonsService]
})
export class StarshipsModule {}