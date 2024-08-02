import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ITokens } from 'src/types';
import { UsersService } from 'src/users/users.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService
  ) {}

  async signUp(data: CreateUserDto) {
    return await this.usersService.createUser(data);
  }

  async refreshTokens(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    return await this.getTokens({ id, email: user.email });
  }

  async getTokens(user: { id: string; email: string }): Promise<ITokens> {
    const { id, email } = user;
    const accessToken = this.jwtService.sign(
      {
        sub: id,
        email,
      },
      {
        secret: this.configService.get('AT_SECRET'),
        expiresIn: 10,
      }
    );

    const refreshToken = this.jwtService.sign(
      {
        sub: id,
      },
      {
        secret: this.configService.get('RT_SECRET'),
        expiresIn: '7d',
      }
    );

    await this.prisma.user.updateMany({
      where: {
        id,
      },
      data: {
        hashedRefreshToken: await argon.hash(refreshToken),
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async revokeToken(userId: string) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken: null,
      },
    });
  }
}
