import { ConfigService } from "@nestjs/config";
import { UsersService } from "src/users/users.service";
declare const FortyTwoStrategy_base: new (...args: any[]) => any;
export declare class FortyTwoStrategy extends FortyTwoStrategy_base {
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
