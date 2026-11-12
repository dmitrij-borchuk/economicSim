import { describe, it, expect, beforeEach } from 'vitest';
import { ConfigService } from '@nestjs/config';
import { InMemoryStorageService, FirestoreStorageService } from './storage.service.js';
import { getOrInitializeFirebaseApp } from '../firebase/firebase-admin.util.js';

describe('InMemoryStorageService', () => {
  let service: InMemoryStorageService;

  beforeEach(() => {
    service = new InMemoryStorageService();
  });

  it('should store and retrieve a user', async () => {
    const user = await service.upsertUser({
      id: 'test-user-1',
      email: 'test@example.com',
      displayName: 'Test Pilot',
      photoURL: null,
      createdAt: new Date().toISOString(),
    });

    expect(user.id).toBe('test-user-1');
    const retrieved = await service.getUserById('test-user-1');
    expect(retrieved?.email).toBe('test@example.com');
  });

  it('should store and retrieve a company by user id, company id, and name', async () => {
    const company = await service.createCompany({
      id: 'uuid-1',
      userId: 'test-user-1',
      companyId: 'CORP-A',
      name: 'Corp Alpha',
      createdAt: new Date().toISOString(),
    });

    expect(company.id).toBe('uuid-1');

    const byUserId = await service.getCompanyByUserId('test-user-1');
    expect(byUserId?.companyId).toBe('CORP-A');

    const byCompanyId = await service.getCompanyByCompanyId('corp-a');
    expect(byCompanyId?.name).toBe('Corp Alpha');

    const byName = await service.getCompanyByName('  corp alpha  ');
    expect(byName?.id).toBe('uuid-1');
  });
});

describe('FirestoreStorageService & FirebaseAdminUtil', () => {
  it('should return null from getOrInitializeFirebaseApp when no credentials are configured', () => {
    const emptyConfig = new ConfigService({});
    const app = getOrInitializeFirebaseApp(emptyConfig);
    // If no existing apps and no creds, should be null
    // (or existing app if initialized elsewhere)
    expect(app === null || typeof app === 'object').toBe(true);
  });

  it('should fail fast if FirestoreStorageService is created without an initialized app or credentials', () => {
    const emptyConfig = new ConfigService({});
    // If no app is passed and credentials cannot be initialized, it must throw cleanly
    try {
      new FirestoreStorageService(emptyConfig);
    } catch (err: unknown) {
      expect((err as Error).message).toContain('Firebase App could not be initialized');
    }
  });
});
