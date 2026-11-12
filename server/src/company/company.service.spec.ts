import { describe, it, expect, beforeEach } from 'vitest';
import { CompanyService } from './company.service.js';
import { InMemoryStorageService } from '../storage/storage.service.js';
import { BadRequestException, ConflictException } from '@nestjs/common';

describe('CompanyService', () => {
  let companyService: CompanyService;
  let storage: InMemoryStorageService;

  beforeEach(() => {
    storage = new InMemoryStorageService();
    companyService = new CompanyService(storage);
  });

  it('should successfully onboard a company with $25,000 cash balance and starter assets', async () => {
    const company = await companyService.onboardCompany('user-1', {
      companyName: 'Apex Agronomics',
      companyId: 'APEX-AGRO-01',
      starterLicenseId: 'AGRONOMIST',
      startingNodeId: 'node_millbrook',
    });

    expect(company).toBeDefined();
    expect(company.name).toBe('Apex Agronomics');
    expect(company.companyId).toBe('APEX-AGRO-01');
    expect(company.cashBalance).toBe(25000);
    expect(company.facilities).toHaveLength(1);
    expect(company.facilities[0].facilityType).toBe('GRAIN_FARM');
    expect(company.inventory?.[0].itemType).toBe('GRAIN');
  });

  it('should reject onboarding if user already has a registered company', async () => {
    await companyService.onboardCompany('user-1', {
      companyName: 'First Corp',
      companyId: 'CORP-1',
      starterLicenseId: 'AGRONOMIST',
      startingNodeId: 'node_millbrook',
    });

    await expect(
      companyService.onboardCompany('user-1', {
        companyName: 'Second Corp',
        companyId: 'CORP-2',
        starterLicenseId: 'FORESTER',
        startingNodeId: 'node_pinewood',
      })
    ).rejects.toThrow(BadRequestException);
  });

  it('should create starting buildings and inventory via createStartingBuildings', () => {
    const assetsAgro = companyService.createStartingBuildings({
      companyId: 'AGRO-01',
      companyName: 'Green Meadows',
      startingNodeId: 'node_millbrook',
      licenseOrFacilityType: 'AGRONOMIST',
    });
    expect(assetsAgro.facilities).toHaveLength(1);
    expect(assetsAgro.facilities[0].facilityType).toBe('GRAIN_FARM');
    expect(assetsAgro.facilities[0].nodeId).toBe('node_millbrook');
    expect(assetsAgro.inventory[0].itemType).toBe('GRAIN');

    const assetsLumber = companyService.createStartingBuildings({
      companyId: 'LUMB-01',
      companyName: 'Tall Pines',
      startingNodeId: 'node_pinewood',
      licenseOrFacilityType: 'LUMBER_CAMP',
    });
    expect(assetsLumber.facilities[0].facilityType).toBe('LUMBER_CAMP');
    expect(assetsLumber.inventory[0].itemType).toBe('TIMBER');

    const assetsMine = companyService.createStartingBuildings({
      companyId: 'MINE-01',
      companyName: 'Deep Ore',
      startingNodeId: 'node_ironridge',
      licenseOrFacilityType: 'IRON_MINE',
    });
    expect(assetsMine.facilities[0].facilityType).toBe('IRON_MINE');
    expect(assetsMine.inventory[0].itemType).toBe('IRON_ORE');
  });

  it('should reject onboarding if Company ID is already taken', async () => {
    await companyService.onboardCompany('user-1', {
      companyName: 'First Corp',
      companyId: 'SAME-ID',
      starterLicenseId: 'AGRONOMIST',
      startingNodeId: 'node_millbrook',
    });

    await expect(
      companyService.onboardCompany('user-2', {
        companyName: 'Second Corp',
        companyId: 'SAME-ID',
        starterLicenseId: 'FORESTER',
        startingNodeId: 'node_pinewood',
      })
    ).rejects.toThrow(ConflictException);
  });
});
