import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AbstractStrategy, PassportStrategy } from "@nestjs/passport";
import { UsersService } from "src/users/users.service";

const { Strategy } = require("passport-42");

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, "42") {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      clientID: configService.get("FORTYTWO_CLIENT_ID"),
      clientSecret: configService.get("FORTYTWO_CLIENT_SECRET"),
      callbackURL: "http://localhost:3000/api/auth/callback/42-school",
      scope: [],
    });
  }

  async validate(accessToken, refreshToken, profile) {
    const user = await this.usersService.upsertUser({
      email: profile.emails[0].value,
      name: profile.displayName,
    });

    return user;
  }
}
