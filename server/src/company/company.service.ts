import {
  Injectable,
  Inject,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import {
  type IStorageService,
  STORAGE_SERVICE,
  type CompanyRecord,
} from '../storage/storage.interface.js';
import { OnboardCompanyDto } from './dto/onboard-company.dto.js';
import {
  createStartingBuildings,
  type StartingBuildingsOptions,
  type StarterAssets,
} from './starter-facilities.js';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(STORAGE_SERVICE) private readonly storage: IStorageService
  ) {}

  async onboardCompany(
    userId: string,
    dto: OnboardCompanyDto
  ): Promise<CompanyRecord> {
    const { companyName, companyId, starterLicenseId, startingNodeId } = dto;

    if (!companyName || !companyName.trim()) {
      throw new BadRequestException('Company Name cannot be blank.');
    }

    if (!companyId || !companyId.trim()) {
      throw new BadRequestException('Company ID cannot be blank.');
    }

    const cleanCompanyId = companyId.trim().toUpperCase();
    const cleanCompanyName = companyName.trim();

    // Check if user already owns a company
    const existingUserCompany = await this.storage.getCompanyByUserId(userId);
    if (existingUserCompany) {
      throw new BadRequestException(
        'User already operates a registered corporation in the simulation.'
      );
    }

    // Check Company ID uniqueness
    const existingId = await this.storage.getCompanyByCompanyId(cleanCompanyId);
    if (existingId) {
      throw new ConflictException(
        `Company ID "${cleanCompanyId}" is already taken by another entity.`
      );
    }

    // Check Company Name uniqueness
    const existingName = await this.storage.getCompanyByName(cleanCompanyName);
    if (existingName) {
      throw new ConflictException(
        `Enterprise Name "${cleanCompanyName}" is already registered.`
      );
    }

    // Provision starter assets using createStartingBuildings
    const { facilities, inventory } = this.createStartingBuildings({
      companyId: cleanCompanyId,
      companyName: cleanCompanyName,
      startingNodeId,
      licenseOrFacilityType: starterLicenseId,
    });

    const company: CompanyRecord = {
      id: `comp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: cleanCompanyName,
      companyId: cleanCompanyId,
      cashBalance: 25000.0,
      reputation: 100.0,
      userId,
      startingNodeId: startingNodeId || 'node_millbrook',
      facilities,
      inventory,
      createdAt: new Date().toISOString(),
    };

    return await this.storage.createCompany(company);
  }

  createStartingBuildings(options: StartingBuildingsOptions): StarterAssets {
    return createStartingBuildings(options);
  }

  async getCompanyByUserId(userId: string): Promise<CompanyRecord | null> {
    return await this.storage.getCompanyByUserId(userId);
  }
}
