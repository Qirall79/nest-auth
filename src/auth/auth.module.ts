import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "src/strategies/local.strategy";
import { UsersModule } from "src/users/users.module";
import { PrismaService } from "src/prisma/prisma.service";
import { AtJwtStrategy } from "src/strategies/jwt-at.strategy";
import { RtJwtStrategy } from "src/strategies/jwt-rt.strategy";
import { GoogleStrategy } from "src/strategies/google.strategy";
import { FortyTwoStrategy } from "src/strategies/fortyTwo.strategy";

@Module({
  imports: [PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AtJwtStrategy,
    RtJwtStrategy,
    GoogleStrategy,
    FortyTwoStrategy,
    PrismaService,
  ],
})
export class AuthModule {}
