import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getOrInitializeFirebaseApp } from '../firebase/firebase-admin.util.js';
import {
  type IStorageService,
  type UserRecord,
  type CompanyRecord,
} from './storage.interface.js';

@Injectable()
export class InMemoryStorageService implements IStorageService {
  private readonly logger = new Logger(InMemoryStorageService.name);
  private users = new Map<string, UserRecord>();
  private companies = new Map<string, CompanyRecord>();

  constructor() {
    this.logger.log('Initialized InMemoryStorageService (Local Development Mode)');
  }

  async getUserById(userId: string): Promise<UserRecord | null> {
    return this.users.get(userId) || null;
  }

  async upsertUser(user: UserRecord): Promise<UserRecord> {
    const existing = this.users.get(user.id);
    const updated = {
      ...existing,
      ...user,
      createdAt: existing?.createdAt || user.createdAt || new Date().toISOString(),
    };
    this.users.set(user.id, updated);
    return updated;
  }

  async getCompanyByUserId(userId: string): Promise<CompanyRecord | null> {
    for (const company of this.companies.values()) {
      if (company.userId === userId) {
        return company;
      }
    }
    return null;
  }

  async getCompanyByCompanyId(companyId: string): Promise<CompanyRecord | null> {
    const normalized = companyId.toUpperCase();
    for (const company of this.companies.values()) {
      if (company.companyId.toUpperCase() === normalized) {
        return company;
      }
    }
    return null;
  }

  async getCompanyByName(name: string): Promise<CompanyRecord | null> {
    const normalized = name.trim().toLowerCase();
    for (const company of this.companies.values()) {
      if (company.name.trim().toLowerCase() === normalized) {
        return company;
      }
    }
    return null;
  }

  async createCompany(company: CompanyRecord): Promise<CompanyRecord> {
    this.companies.set(company.id, company);
    this.logger.log(`Company "${company.name}" (${company.companyId}) registered for User ${company.userId}`);
    return company;
  }
}

@Injectable()
export class FirestoreStorageService implements IStorageService {
  private readonly logger = new Logger(FirestoreStorageService.name);
  private firestore: Firestore;

  constructor(
    private configService: ConfigService,
    app?: App,
  ) {
    const targetApp = app ?? getOrInitializeFirebaseApp(configService);
    if (!targetApp) {
      throw new Error('Firebase App could not be initialized for FirestoreStorageService.');
    }
    this.firestore = getFirestore(targetApp);
    this.logger.log('Initialized FirestoreStorageService connected to Cloud Firestore');
  }

  async getUserById(userId: string): Promise<UserRecord | null> {
    const doc = await this.firestore.collection('users').doc(userId).get();
    if (!doc.exists) return null;
    return doc.data() as UserRecord;
  }

  async upsertUser(user: UserRecord): Promise<UserRecord> {
    const docRef = this.firestore.collection('users').doc(user.id);
    const existing = await docRef.get();
    if (!existing.exists) {
      await docRef.set(user);
      return user;
    }
    await docRef.set(user, { merge: true });
    const updated = await docRef.get();
    return updated.data() as UserRecord;
  }

  async getCompanyByUserId(userId: string): Promise<CompanyRecord | null> {
    const snapshot = await this.firestore
      .collection('companies')
      .where('userId', '==', userId)
      .limit(1)
      .get();
    if (snapshot.empty) return null;
    return snapshot.docs[0].data() as CompanyRecord;
  }

  async getCompanyByCompanyId(companyId: string): Promise<CompanyRecord | null> {
    const snapshot = await this.firestore
      .collection('companies')
      .where('companyId', '==', companyId.toUpperCase())
      .limit(1)
      .get();
    if (snapshot.empty) return null;
    return snapshot.docs[0].data() as CompanyRecord;
  }

  async getCompanyByName(name: string): Promise<CompanyRecord | null> {
    const snapshot = await this.firestore
      .collection('companies')
      .where('name', '==', name)
      .limit(1)
      .get();
    if (snapshot.empty) return null;
    return snapshot.docs[0].data() as CompanyRecord;
  }

  async createCompany(company: CompanyRecord): Promise<CompanyRecord> {
    await this.firestore.collection('companies').doc(company.id).set(company);
    return company;
  }
}
