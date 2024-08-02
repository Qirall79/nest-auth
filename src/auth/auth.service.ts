import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { ITokens } from "src/types";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService
  ) {}

  async login() {
    // todo
  }

  async signUp(data: CreateUserDto) {
    return await this.usersService.createUser(data);
  }

  async refreshTokens(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    return this.getTokens({ id, email: user.email });
  }

  async logout() {
    // todo
  }

  async getTokens(user: { id: string; email: string }): Promise<ITokens> {
    const { id, email } = user;
    const accessToken = this.jwtService.sign(
      {
        sub: id,
        email,
      },
      {
        secret: this.configService.get("AT_SECRET"),
        expiresIn: 60 * 15,
      }
    );

    const refreshToken = this.jwtService.sign(
      {
        sub: id,
      },
      {
        secret: this.configService.get("RT_SECRET"),
        expiresIn: "7d",
      }
    );

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        hashedRefreshToken: this.jwtService.sign(refreshToken, {
          secret: this.configService.get("JWT_SECRET"),
        }),
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
