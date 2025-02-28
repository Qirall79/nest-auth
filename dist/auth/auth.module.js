"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const passport_1 = require("@nestjs/passport");
const local_strategy_1 = require("../strategies/local.strategy");
const users_module_1 = require("../users/users.module");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_at_strategy_1 = require("../strategies/jwt-at.strategy");
const jwt_rt_strategy_1 = require("../strategies/jwt-rt.strategy");
const google_strategy_1 = require("../strategies/google.strategy");
const fortyTwo_strategy_1 = require("../strategies/fortyTwo.strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [passport_1.PassportModule, users_module_1.UsersModule],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_at_strategy_1.AtJwtStrategy,
            jwt_rt_strategy_1.RtJwtStrategy,
            google_strategy_1.GoogleStrategy,
            fortyTwo_strategy_1.FortyTwoStrategy,
            prisma_service_1.PrismaService,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map