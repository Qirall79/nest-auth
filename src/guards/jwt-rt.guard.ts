import { AuthGuard } from "@nestjs/passport";

export class RtJwtAuthGuard extends AuthGuard("jwt-rt") {}
