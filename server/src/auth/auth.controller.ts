import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { FirebaseAuthGuard, type AuthenticatedRequest } from './firebase-auth.guard.js';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(FirebaseAuthGuard)
  async getCurrentSession(@Req() req: AuthenticatedRequest) {
    const session = await this.authService.getOrCreateUser(
      req.user.uid,
      req.user.email,
      req.user.name,
      req.user.picture
    );

    return {
      success: true,
      data: session,
    };
  }
}
