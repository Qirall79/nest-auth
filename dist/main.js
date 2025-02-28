"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        origin: ["http://localhost:3001"],
        methods: ["POST", "GET", "OPTIONS", "DELETE", "PUT"],
        credentials: true,
    });
    app.use(cookieParser());
    app.setGlobalPrefix("api");
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map