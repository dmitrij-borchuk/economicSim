import { Injectable, Inject } from '@nestjs/common';
import {
  type IStorageService,
  STORAGE_SERVICE,
  type UserRecord,
  type CompanyRecord,
} from '../storage/storage.interface.js';

@Injectable()
export class AuthService {
  constructor(
    @Inject(STORAGE_SERVICE) private readonly storage: IStorageService
  ) {}

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
