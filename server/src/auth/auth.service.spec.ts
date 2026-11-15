import { describe, it, expect, beforeEach } from 'vitest';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service.js';
import { FirebaseAdminService } from './firebase-admin.service.js';
import { InMemoryStorageService } from '../storage/storage.service.js';

describe('AuthService', () => {
  let authService: AuthService;
  let storage: InMemoryStorageService;
  let firebaseAdmin: FirebaseAdminService;

  beforeEach(() => {
    storage = new InMemoryStorageService();
    firebaseAdmin = new FirebaseAdminService(new ConfigService({}));
    authService = new AuthService(storage, firebaseAdmin);
  });

  it('should create new user record if user does not exist', async () => {
    const result = await authService.getOrCreateUser('uid-123', 'pilot@sim.com', 'Pilot One');

    expect(result.user).toBeDefined();
    expect(result.user.id).toBe('uid-123');
    expect(result.user.email).toBe('pilot@sim.com');
    expect(result.company).toBeNull();
  });

  it('should return existing user without overwriting data', async () => {
    await authService.getOrCreateUser('uid-123', 'pilot@sim.com');
    const result = await authService.getOrCreateUser('uid-123', 'newemail@sim.com');

    expect(result.user.id).toBe('uid-123');
  });

  it('should register and login a user via server auth service', async () => {
    const regResult = await authService.register('testpilot@sim.com', 'secret123');
    expect(regResult.user.email).toBe('testpilot@sim.com');
    expect(regResult.token).toBeDefined();

    const loginResult = await authService.login('testpilot@sim.com', 'secret123');
    expect(loginResult.user.id).toBe(regResult.user.id);
    expect(loginResult.token).toBeDefined();
  });
});
