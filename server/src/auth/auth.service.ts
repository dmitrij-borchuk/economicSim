import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import {
  type IStorageService,
  STORAGE_SERVICE,
  type UserRecord,
  type CompanyRecord,
} from '../storage/storage.interface.js';
import { FirebaseAdminService } from './firebase-admin.service.js';

export interface AuthSessionResult {
  user: UserRecord;
  company: CompanyRecord | null;
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(STORAGE_SERVICE) private readonly storage: IStorageService,
    private readonly firebaseAdmin: FirebaseAdminService
  ) {}

  async register(email: string, password: string): Promise<AuthSessionResult> {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required.');
    }

    const authResult = await this.firebaseAdmin.signUpWithEmailPassword(
      email,
      password
    );

    const session = await this.getOrCreateUser(
      authResult.uid,
      authResult.email,
      authResult.displayName,
      authResult.photoURL
    );

    return {
      user: session.user,
      company: session.company,
      token: authResult.idToken,
    };
  }

  async login(email: string, password: string): Promise<AuthSessionResult> {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required.');
    }

    const authResult = await this.firebaseAdmin.signInWithEmailPassword(
      email,
      password
    );

    const session = await this.getOrCreateUser(
      authResult.uid,
      authResult.email,
      authResult.displayName,
      authResult.photoURL
    );

    return {
      user: session.user,
      company: session.company,
      token: authResult.idToken,
    };
  }

  async loginWithGoogle(idToken: string): Promise<AuthSessionResult> {
    if (!idToken) {
      throw new BadRequestException('Google ID token is required.');
    }

    const decoded = await this.firebaseAdmin.verifyIdToken(idToken);
    const session = await this.getOrCreateUser(
      decoded.uid,
      decoded.email,
      decoded.name,
      decoded.picture
    );

    return {
      user: session.user,
      company: session.company,
      token: idToken,
    };
  }

  async getOrCreateUser(
    uid: string,
    email?: string,
    displayName?: string,
    photoURL?: string
  ): Promise<{ user: UserRecord; company: CompanyRecord | null }> {
    let user = await this.storage.getUserById(uid);

    if (!user) {
      user = await this.storage.upsertUser({
        id: uid,
        email: email || null,
        displayName: displayName || null,
        photoURL: photoURL || null,
        createdAt: new Date().toISOString(),
      });
    }

    const company = await this.storage.getCompanyByUserId(uid);

    return {
      user,
      company,
    };
  }
}
