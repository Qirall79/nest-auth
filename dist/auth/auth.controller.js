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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_user_dto_1 = require("../dto/create-user.dto");
const local_guard_1 = require("../guards/local.guard");
const jwt_rt_guard_1 = require("../guards/jwt-rt.guard");
const passport_1 = require("@nestjs/passport");
const COOKIE_OPTIONS = {
    maxAge: 60 * 60 * 24 * 5 * 1000,
    secure: false,
    httpOnly: true,
};
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, res) {
        const { email, id } = req.user;
        const { refreshToken, accessToken } = await this.authService.getTokens({
            id,
            email,
        });
        res.cookie("access_token", accessToken, COOKIE_OPTIONS);
        res.cookie("refresh_token", refreshToken, COOKIE_OPTIONS);
        res.send({
            user: req.user,
        });
    }
    async signUp(data) {
        return this.authService.signUp(data);
    }
    async googleLogin() { }
    async googleCallback(req, res) {
        const { email, id } = req.user;
        const { accessToken, refreshToken } = await this.authService.getTokens({
            id,
            email,
        });
        res
            .cookie("access_token", accessToken, COOKIE_OPTIONS)
            .cookie("refresh_token", refreshToken, COOKIE_OPTIONS)
            .redirect("http://localhost:3001/server");
    }
    async refresh(req, res) {
        const { accessToken, refreshToken } = await this.authService.refreshTokens(req.user.id);
        res
            .cookie("access_token", accessToken, COOKIE_OPTIONS)
            .cookie("refresh_token", refreshToken, COOKIE_OPTIONS)
            .send({
            message: "refreshed",
        });
    }
    async logout(req, res) {
        const userId = req.user.id;
        await this.authService.revokeToken(userId);
        res.clearCookie("access_token", COOKIE_OPTIONS);
        res.clearCookie("refresh_token", COOKIE_OPTIONS);
        return {
            message: "logged out",
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(local_guard_1.LocalAuthGuard),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("google")),
    (0, common_1.Get)("google"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("google")),
    (0, common_1.Get)("callback/google"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleCallback", null);
__decorate([
    (0, common_1.UseGuards)(jwt_rt_guard_1.RtJwtAuthGuard),
    (0, common_1.Get)("refresh"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)({ passthrough: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.UseGuards)(jwt_rt_guard_1.RtJwtAuthGuard),
    (0, common_1.Get)("logout"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map