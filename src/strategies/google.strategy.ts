import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { UsersService } from "src/users/users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      clientID: configService.get("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get("GOOGLE_CLIENT_SECRET"),
      callbackURL: "http://localhost:3000/api/auth/callback/google",
      scope: ["profile", "email"],
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
