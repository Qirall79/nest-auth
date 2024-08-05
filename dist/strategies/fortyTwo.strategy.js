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
exports.FortyTwoStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const users_service_1 = require("../users/users.service");
const { Strategy } = require("passport-42");
let FortyTwoStrategy = class FortyTwoStrategy extends (0, passport_1.PassportStrategy)(Strategy, "42") {
    constructor(configService, usersService) {
        super({
            clientID: configService.get("FORTYTWO_CLIENT_ID"),
            clientSecret: configService.get("FORTYTWO_CLIENT_SECRET"),
            callbackURL: "http://localhost:3000/api/auth/callback/42-school",
            scope: [],
        });
        this.configService = configService;
        this.usersService = usersService;
    }
    async validate(accessToken, refreshToken, profile) {
        const user = await this.usersService.upsertUser({
            email: profile.emails[0].value,
            name: profile.displayName,
        });
        return user;
    }
};
exports.FortyTwoStrategy = FortyTwoStrategy;
exports.FortyTwoStrategy = FortyTwoStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService])
], FortyTwoStrategy);
//# sourceMappingURL=fortyTwo.strategy.js.map