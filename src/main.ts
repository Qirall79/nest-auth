import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ["http://localhost:3001"],
    methods: ["POST", "GET", "OPTIONS", "DELETE", "PUT"],
    credentials: true,
  });
  app.use(cookieParser());
  app.setGlobalPrefix("api");
  await app.listen(3000);
}
bootstrap();
