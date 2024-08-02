import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { AuthService } from "src/auth/auth.service";
import { CreateUserDto } from "src/dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { ITokens } from "src/types";
export declare class UsersService {
    private prisma;
    private jwtService;
    private configService;
    private authService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService, authService: AuthService);
    createUser(data: CreateUserDto): Promise<ITokens>;
    validateUser(email: string, password: string): Promise<User>;
    findUser(email: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        hashedPassword: string | null;
        hashedRefreshToken: string | null;
    }>;
}
