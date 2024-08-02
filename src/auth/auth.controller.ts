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

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
};

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { email, id } = req.user;
    const { refreshToken, accessToken } = await this.authService.getTokens({
      id,
      email,
    });
    res.cookie("access_token", accessToken, COOKIE_OPTIONS);
    res.cookie("refresh_token", refreshToken, COOKIE_OPTIONS);
    return {
      user: req.user,
    };
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
    res.cookie("access_token", accessToken, COOKIE_OPTIONS);
    res.cookie("refresh_token", refreshToken, COOKIE_OPTIONS);
    res.redirect("http://localhost:3001/");
  }

  @UseGuards(RtJwtAuthGuard)
  @Get("refresh")
  async refresh(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      req.user.id
    );
    res.cookie("access_token", accessToken, COOKIE_OPTIONS);
    res.cookie("refresh_token", refreshToken, COOKIE_OPTIONS);
    // res.redirect("http://localhost:3001/");
    res.send({
      user: req.user,
    });
  }

  @Get("logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("access_token", COOKIE_OPTIONS);
    res.clearCookie("refresh_token", COOKIE_OPTIONS);
    return {
      message: "logged out",
    };
  }
}
