import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { STORAGE_SERVICE } from './storage.interface.js';
import { InMemoryStorageService, FirestoreStorageService } from './storage.service.js';
import { getOrInitializeFirebaseApp } from '../firebase/firebase-admin.util.js';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    InMemoryStorageService,
    {
      provide: STORAGE_SERVICE,
      inject: [ConfigService, InMemoryStorageService],
      useFactory: (config: ConfigService, inMemory: InMemoryStorageService) => {
        const app = getOrInitializeFirebaseApp(config);

        if (app) {
          try {
            return new FirestoreStorageService(config, app);
          } catch (err) {
            console.warn('Failed to initialize FirestoreStorageService, falling back to InMemoryStorageService:', err);
            return inMemory;
          }
        }

        return inMemory;
      },
    },
  ],
  exports: [STORAGE_SERVICE],
})
export class StorageModule { }
