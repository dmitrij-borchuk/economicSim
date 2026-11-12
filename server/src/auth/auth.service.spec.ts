import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService } from './auth.service.js';
import { InMemoryStorageService } from '../storage/storage.service.js';

describe('AuthService', () => {
  let authService: AuthService;
  let storage: InMemoryStorageService;

  beforeEach(() => {
    storage = new InMemoryStorageService();
    authService = new AuthService(storage);
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
});
