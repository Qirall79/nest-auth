import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RtJwtStrategy extends PassportStrategy(Strategy, "jwt-rt") {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("RT_SECRET"),
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    const refreshToken = req.headers.authorization.split(" ")[1];
    const userId = payload.sub;
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedRefreshToken) return null;

    const isMatched =
      this.jwtService.sign(refreshToken, {
        secret: this.configService.get("JWT_SECRET"),
      }) === user.hashedRefreshToken;

    if (!isMatched) return null;
    return { id: userId };
  }
}
