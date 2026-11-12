import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseAdminService } from './firebase-admin.service.js';
import { FirebaseAuthGuard } from './firebase-auth.guard.js';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [FirebaseAdminService, FirebaseAuthGuard, AuthService],
  exports: [FirebaseAdminService, FirebaseAuthGuard, AuthService],
})
export class AuthModule {}
