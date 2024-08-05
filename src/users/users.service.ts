import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { AuthService } from "src/auth/auth.service";
import { CreateUserDto } from "src/dto/create-user.dto";
import { UpsertUserDto } from "src/dto/upsert-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { ITokens } from "src/types";

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  async createUser(data: CreateUserDto): Promise<ITokens> {
    const { email, name, password } = data;

    const hashedPassword = this.jwtService.sign(password, {
      secret: this.configService.get("JWT_SECRET"),
    });

    const user = await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
        name,
      },
    });

    const { refreshToken, accessToken } = await this.authService.getTokens({
      email: user.email,
      id: user.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) return null;

    const isMatched: boolean =
      this.jwtService.sign(password, {
        secret: this.configService.get("JWT_SECRET"),
      }) === user.hashedPassword;

    if (!isMatched) return null;
    return user;
  }

  async findUser(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async upsertUser(data: UpsertUserDto) {
    const { email, name } = data;
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) return user;
    return await this.prisma.user.create({
      data: {
        email,
        name,
      },
    });
  }
}
