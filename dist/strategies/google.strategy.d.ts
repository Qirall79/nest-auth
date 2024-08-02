import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-google-oauth20";
import { UsersService } from "src/users/users.service";
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(accessToken: any, refreshToken: any, profile: any): Promise<{
        id: string;
        email: string;
        name: string | null;
        hashedPassword: string | null;
        hashedRefreshToken: string | null;
    }>;
}
export {};
