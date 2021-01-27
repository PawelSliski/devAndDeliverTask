import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserProviders } from "./users.providers";
import { DatabaseModule } from "../database/database.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.register({secret: "devanddeliver", signOptions: {expiresIn: 3600}})
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, ...UserProviders]
})
export class UsersModule {}
