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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma, jwtService, configService, authService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
        this.authService = authService;
    }
    async createUser(data) {
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
    async validateUser(email, password) {
        const user = await this.prisma.user.findFirst({
            where: {
                email,
            },
        });
        const isMatched = this.jwtService.sign(password, {
            secret: this.configService.get("JWT_SECRET"),
        }) === user.hashedPassword;
        if (!isMatched)
            return null;
        return user;
    }
    async findUser(email) {
        return await this.prisma.user.findFirst({
            where: {
                email: email,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map