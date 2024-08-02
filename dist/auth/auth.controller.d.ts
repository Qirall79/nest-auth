import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/dto/create-user.dto";
import { ITokens } from "src/types";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<ITokens>;
    signUp(data: CreateUserDto): Promise<ITokens>;
    refresh(req: any): Promise<ITokens>;
    logout(): Promise<void>;
}
