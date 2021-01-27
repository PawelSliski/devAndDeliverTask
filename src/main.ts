import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { JwtAuthGuard } from "./auth/guards/jwtAuthGuard";
require("dotenv").config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
