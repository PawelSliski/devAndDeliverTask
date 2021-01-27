import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/guards/jwtAuthGuard";
import { UsersModule } from "./users/users.module";
import { FilmsModule } from "./films/films.module";
import { SpeciesModule } from "./species/species.module";
import { VehiclesModule } from "./vehicles/vehicles.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    FilmsModule,
    SpeciesModule,
    VehiclesModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule{}

