import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/dto/create-user.dto";
import { ITokens } from "src/types";
import { LocalAuthGuard } from "src/guards/local.guard";
import { RtJwtAuthGuard } from "src/guards/jwt-rt.guard";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";

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

  @UseGuards(AuthGuard("google"))
  @Get("google")
  async googleLogin() {}

  @UseGuards(AuthGuard("google"))
  @Get("callback/google")
  async googleCallback(
    @Request() req,
    @Res({ passthrough: true }) res: Response
  ) {
    const { email, id } = req.user;
    const { accessToken, refreshToken } = await this.authService.getTokens({
      id,
      email,
    });
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: false,
      secure: false,
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: false,
      secure: false,
    });
    res.redirect("http://localhost:3001/");
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
