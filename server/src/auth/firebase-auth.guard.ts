import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { type Request } from 'express';
import { FirebaseAdminService, type DecodedAuthToken } from './firebase-admin.service.js';

export interface AuthenticatedRequest extends Request {
  user: DecodedAuthToken;
}

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseAdmin: FirebaseAdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or malformed Authorization header. Expected Bearer <token>.');
    }

    const token = authHeader.split('Bearer ')[1]?.trim();
    if (!token) {
      throw new UnauthorizedException('Empty Bearer token provided.');
    }

    try {
      const decoded = await this.firebaseAdmin.verifyIdToken(token);
      request.user = decoded;
      return true;
    } catch (err: unknown) {
      const message = (err as Error)?.message || 'Unauthorized: Token verification failed.';
      throw new UnauthorizedException(message);
    }
  }
}
