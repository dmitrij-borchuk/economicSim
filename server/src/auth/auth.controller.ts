import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import {
  FirebaseAuthGuard,
  type AuthenticatedRequest,
} from './firebase-auth.guard.js';

export interface AuthCredentialsDto {
  email: string;
  password: string;
}

export interface GoogleAuthDto {
  idToken: string;
}

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: AuthCredentialsDto) {
    return this.authService.register(dto.email, dto.password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthCredentialsDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('google')
  @HttpCode(HttpStatus.OK)
  async loginWithGoogle(@Body() dto: GoogleAuthDto) {
    return this.authService.loginWithGoogle(dto.idToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    return {
      success: true,
    };
  }

  @Get('me')
  @UseGuards(FirebaseAuthGuard)
  async getCurrentSession(@Req() req: AuthenticatedRequest) {
    const session = await this.authService.getOrCreateUser(
      req.user.uid,
      req.user.email,
      req.user.name,
      req.user.picture,
    );

    return {
      success: true,
      data: session,
    };
  }
}
