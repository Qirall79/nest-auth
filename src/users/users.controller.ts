import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AtJwtAuthGuard } from "src/guards/jwt-at.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AtJwtAuthGuard)
  @Get("current")
  async getCurrentUser(@Request() req) {
    return {
      user: req.user,
    };
  }
}
