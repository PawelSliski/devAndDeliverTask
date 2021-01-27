import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/guards/jwtAuthGuard";
import { UsersModule } from "./users/users.module";
import { FilmsModule } from "./films/films.module";
import { SpeciesModule } from "./auth/species/species.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    FilmsModule,
    SpeciesModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule{}

