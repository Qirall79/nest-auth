import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { ITokens } from "src/types";
import { UsersService } from "src/users/users.service";
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    private prisma;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService, prisma: PrismaService);
    login(): Promise<void>;
    signUp(data: CreateUserDto): Promise<ITokens>;
    refreshTokens(id: string): Promise<ITokens>;
    logout(): Promise<void>;
    getTokens(user: {
        id: string;
        email: string;
    }): Promise<ITokens>;
}
