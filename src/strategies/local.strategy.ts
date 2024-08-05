import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UsersService } from "src/users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      usernameField: "email",
    });
  }

  async validate(username: string, password: string) {
    const user = await this.usersService.validateUser(username, password);

    if (!user) throw new UnauthorizedException('invalid credentials');
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
