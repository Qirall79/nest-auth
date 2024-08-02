import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
declare const RtJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class RtJwtStrategy extends RtJwtStrategy_base {
    private configService;
    private prisma;
    private jwtService;
    constructor(configService: ConfigService, prisma: PrismaService, jwtService: JwtService);
    validate(req: any, payload: any): Promise<{
        id: any;
    }>;
}
export {};
