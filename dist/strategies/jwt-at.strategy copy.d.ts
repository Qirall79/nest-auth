import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
declare const AtJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class AtJwtStrategy extends AtJwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        userId: any;
        email: any;
    }>;
}
export {};
