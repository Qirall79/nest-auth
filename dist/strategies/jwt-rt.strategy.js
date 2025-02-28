"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtJwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const cookieExtractor = (req) => {
    let jwt = null;
    if (req && req.cookies) {
        jwt = req.cookies['refresh_token'];
    }
    return jwt;
};
let RtJwtStrategy = class RtJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-rt') {
    constructor(configService, prisma, jwtService) {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: configService.get('RT_SECRET'),
            passReqToCallback: true,
        });
        this.configService = configService;
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async validate(req, payload) {
        const refreshToken = cookieExtractor(req);
        if (!refreshToken)
            throw new common_1.UnauthorizedException('invalid refresh token');
        const userId = payload.sub;
        const user = await this.prisma.user.findFirst({
            where: {
                id: userId,
            },
        });
        if (!user || !user.hashedRefreshToken)
            throw new common_1.UnauthorizedException('invalid refresh token');
        const isMatched = argon.verify(user.hashedRefreshToken, refreshToken);
        if (!isMatched)
            return null;
        return { id: userId };
    }
};
exports.RtJwtStrategy = RtJwtStrategy;
exports.RtJwtStrategy = RtJwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService])
], RtJwtStrategy);
//# sourceMappingURL=jwt-rt.strategy.js.map