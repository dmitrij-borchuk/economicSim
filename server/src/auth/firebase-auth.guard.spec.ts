import { describe, it, expect, beforeEach } from 'vitest';
import { UnauthorizedException, type ExecutionContext } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth.guard.js';
import { FirebaseAdminService } from './firebase-admin.service.js';
import { ConfigService } from '@nestjs/config';

describe('FirebaseAuthGuard', () => {
  let guard: FirebaseAuthGuard;
  let adminService: FirebaseAdminService;

  beforeEach(() => {
    const configService = new ConfigService({});
    adminService = new FirebaseAdminService(configService);
    guard = new FirebaseAuthGuard(adminService);
  });

  const createMockContext = (authHeader?: string): ExecutionContext => {
    const req = {
      headers: {
        authorization: authHeader,
      },
    };
    return {
      switchToHttp: () => ({
        getRequest: () => req,
      }),
    } as unknown as ExecutionContext;
  };

  it('should throw UnauthorizedException if Authorization header is missing', async () => {
    const context = createMockContext(undefined);
    await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if header does not start with Bearer', async () => {
    const context = createMockContext('Basic 12345');
    await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
  });

  it('should accept valid dev token and attach user to request', async () => {
    const context = createMockContext('Bearer dev-token-pilot-007');
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    const req = context.switchToHttp().getRequest();
    expect(req.user).toBeDefined();
    expect(req.user.uid).toBe('pilot-007');
  });
});
