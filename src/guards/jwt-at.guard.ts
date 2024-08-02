import { AuthGuard } from "@nestjs/passport";

export class AtJwtAuthGuard extends AuthGuard("jwt-at") {}
