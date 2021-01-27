import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { DatabaseModule } from "../database/database.module";
import { UsersController } from "../users/users.controller";

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: "devandeliver",
      signOptions: {
        expiresIn: 3600
      }
    }),
    UsersModule,
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}