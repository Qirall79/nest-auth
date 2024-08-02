import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcryptjs'

const cookieExtractor = (req) => {
  let jwt = null;
  console.log(req.cookies);
  
  if (req && req.cookies) {
    jwt = req.cookies["refresh_token"];
  }

  return jwt;
};

@Injectable()
export class RtJwtStrategy extends PassportStrategy(Strategy, "jwt-rt") {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get("RT_SECRET"),
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    const refreshToken = cookieExtractor(req);
    if (!refreshToken) throw new UnauthorizedException("invalid refresh token");
    const userId = payload.sub;
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedRefreshToken)
      throw new UnauthorizedException("invalid refresh token");

    const isMatched = bcrypt.compareSync(refreshToken, user.hashedRefreshToken);

    if (!isMatched) return null;

    return { id: userId };
  }
}
