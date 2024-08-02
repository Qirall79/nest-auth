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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService, prisma) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.prisma = prisma;
    }
    async signUp(data) {
        return await this.usersService.createUser(data);
    }
    async refreshTokens(id) {
        const user = await this.prisma.user.findFirst({
            where: {
                id,
            },
        });
        return await this.getTokens({ id, email: user.email });
    }
    async getTokens(user) {
        const { id, email } = user;
        const accessToken = this.jwtService.sign({
            sub: id,
            email,
        }, {
            secret: this.configService.get("AT_SECRET"),
            expiresIn: 60 * 5,
        });
        const refreshToken = this.jwtService.sign({
            sub: id,
        }, {
            secret: this.configService.get("RT_SECRET"),
            expiresIn: "7d",
        });
        await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                hashedRefreshToken: bcrypt.hashSync(refreshToken, 10),
            },
        });
        return {
            accessToken,
            refreshToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map