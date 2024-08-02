import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

const cookieExtractor = (req) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies['refresh_token'];
  }

  return jwt;
};

@Injectable()
export class RtJwtStrategy extends PassportStrategy(Strategy, 'jwt-rt') {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get('RT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    const refreshToken = cookieExtractor(req);
    if (!refreshToken) throw new UnauthorizedException('invalid refresh token');

    const userId = payload.sub;
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedRefreshToken)
      throw new UnauthorizedException('invalid refresh token');

    const isMatched = argon.verify(user.hashedRefreshToken, refreshToken);

    if (!isMatched) return null;

    return { id: userId };
  }
}
