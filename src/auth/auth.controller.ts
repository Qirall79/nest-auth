import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/dto/create-user.dto";
import { ITokens } from "src/types";
import { LocalAuthGuard } from "src/guards/local.guard";
import { RtJwtAuthGuard } from "src/guards/jwt-rt.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req): Promise<ITokens> {
    const { email, id } = req.user;
    return this.authService.getTokens({ id, email });
  }

  @Post("signup")
  async signUp(@Body() data: CreateUserDto) {
    return this.authService.signUp(data);
  }

  @UseGuards(RtJwtAuthGuard)
  @Get("refresh")
  async refresh(@Request() req) {
    return this.authService.refreshTokens(req.user.id);
  }

  @Get("logout")
  async logout() {
    return this.authService.logout();
  }
}
