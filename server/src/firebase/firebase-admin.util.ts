import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import * as fs from 'node:fs';
import * as path from 'node:path';

const logger = new Logger('FirebaseAdminUtil');

export function getOrInitializeFirebaseApp(configService: ConfigService): App | null {
  const existingApps = getApps();
  if (existingApps.length > 0) {
    return existingApps[0];
  }

  const googleAppCreds =
    configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS') ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const projectId = configService.get<string>('FIREBASE_PROJECT_ID');
  const clientEmail = configService.get<string>('FIREBASE_CLIENT_EMAIL');
  const privateKey = configService.get<string>('FIREBASE_PRIVATE_KEY');

  if (googleAppCreds) {
    let credPath = path.isAbsolute(googleAppCreds)
      ? googleAppCreds
      : path.resolve(process.cwd(), googleAppCreds);

    if (!fs.existsSync(credPath) && fs.existsSync(`${credPath}.json`)) {
      credPath = `${credPath}.json`;
    }

    if (fs.existsSync(credPath)) {
      try {
        process.env.GOOGLE_APPLICATION_CREDENTIALS = credPath;
        const app = initializeApp({
          credential: cert(credPath),
          projectId,
        });
        logger.log(`Firebase Admin initialized from credentials file: ${credPath}`);
        return app;
      } catch (err) {
        logger.error(`Failed to initialize Firebase Admin with file ${credPath}:`, err);
        return null;
      }
    } else {
      logger.warn(`Configured GOOGLE_APPLICATION_CREDENTIALS file not found: ${credPath}`);
    }
  }

  if (projectId && clientEmail && privateKey) {
    try {
      const app = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
      logger.log(`Firebase Admin initialized with service account cert (project: ${projectId})`);
      return app;
    } catch (err) {
      logger.error('Failed to initialize Firebase Admin with service account cert:', err);
      return null;
    }
  }

  return null;
}
