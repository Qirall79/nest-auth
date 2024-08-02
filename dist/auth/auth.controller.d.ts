import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { ITokens } from 'src/types';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any, res: Response): Promise<void>;
    signUp(data: CreateUserDto): Promise<ITokens>;
    googleLogin(): Promise<void>;
    googleCallback(req: any, res: Response): Promise<void>;
    refresh(req: any, res: Response): Promise<void>;
    logout(req: any, res: Response): Promise<{
        message: string;
    }>;
}
