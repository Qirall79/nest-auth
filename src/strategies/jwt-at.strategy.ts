import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

const cookieExtractor = (req) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies["access_token"];
  }

  return jwt;
};

@Injectable()
export class AtJwtStrategy extends PassportStrategy(Strategy, "jwt-at") {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get("AT_SECRET"),
    });
  }

  async validate(payload: any) {
    console.log("hello");

    return { userId: payload.sub, email: payload.email };
  }
}
