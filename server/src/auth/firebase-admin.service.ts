import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getOrInitializeFirebaseApp } from '../firebase/firebase-admin.util.js';

export interface DecodedAuthToken {
  uid: string;
  email?: string;
  name?: string;
  picture?: string;
}

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseAdminService.name);
  private app: App | null = null;
  private isInitialized = false;

  constructor(private configService: ConfigService) {
    this.initApp();
  }

  onModuleInit() {
    this.initApp();
  }

  private initApp() {
    if (this.isInitialized && this.app) {
      return;
    }

    this.app = getOrInitializeFirebaseApp(this.configService);
    if (this.app) {
      this.isInitialized = true;
      this.logger.log('Firebase Admin initialized and ready.');
    } else {
      this.logger.warn(
        'Firebase Admin credentials not fully configured. Running in Local Development / Fallback mode.'
      );
    }
  }

  async verifyIdToken(token: string): Promise<DecodedAuthToken> {
    if (this.isInitialized && this.app) {
      try {
        const decoded = await getAuth(this.app).verifyIdToken(token);
        return {
          uid: decoded.uid,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
        };
      } catch (err) {
        // Fall back to checking if it's a dev simulated token
        if (token.startsWith('dev-token-') || token.startsWith('mock-token-')) {
          const uid = token.replace(/^(dev|mock)-token-/, '');
          return {
            uid: uid || 'dev-pilot-001',
            email: `${uid || 'dev-pilot'}@economic-sim.local`,
            name: 'Local Tactical Pilot',
          };
        }
        throw err;
      }
    }

    // In local dev/fallback mode when live Firebase credentials aren't set
    if (token.startsWith('dev-token-') || token.startsWith('mock-token-')) {
      const uid = token.replace(/^(dev|mock)-token-/, '');
      return {
        uid: uid || 'dev-pilot-001',
        email: `${uid || 'dev-pilot'}@economic-sim.local`,
        name: 'Local Tactical Pilot',
      };
    }

    // If it's a JWT from the client but admin isn't configured, extract payload for local testing
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payloadJson = Buffer.from(parts[1], 'base64').toString('utf-8');
        const payload = JSON.parse(payloadJson);
        if (payload.user_id || payload.sub) {
          return {
            uid: payload.user_id || payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
          };
        }
      }
    } catch {
      // Ignored, proceed to fallback error
    }

    throw new Error('Invalid or unverified Firebase ID token.');
  }
}
