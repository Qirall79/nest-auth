"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtJwtAuthGuard = void 0;
const passport_1 = require("@nestjs/passport");
class AtJwtAuthGuard extends (0, passport_1.AuthGuard)("jwt-at") {
}
exports.AtJwtAuthGuard = AtJwtAuthGuard;
//# sourceMappingURL=jwt-at.guard.js.map