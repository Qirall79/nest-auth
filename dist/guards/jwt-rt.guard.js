"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtJwtAuthGuard = void 0;
const passport_1 = require("@nestjs/passport");
class RtJwtAuthGuard extends (0, passport_1.AuthGuard)("jwt-rt") {
}
exports.RtJwtAuthGuard = RtJwtAuthGuard;
//# sourceMappingURL=jwt-rt.guard.js.map