import {
  type FacilityRecord,
  type InventoryItemRecord,
} from '../storage/storage.interface.js';

export interface StartingBuildingsOptions {
  companyId: string;
  companyName: string;
  startingNodeId?: string;
  licenseOrFacilityType?: string;
}

export interface StarterAssets {
  facilities: FacilityRecord[];
  inventory: InventoryItemRecord[];
}

/**
 * Creates starting facilities (buildings) and initial inventory assets
 * according to the company's designated starter package or facility type.
 */
export function createStartingBuildings(
  options: StartingBuildingsOptions
): StarterAssets {
  const { companyId, companyName, startingNodeId, licenseOrFacilityType } =
    options;

  const cleanCompanyId = companyId.trim().toUpperCase();
  const cleanCompanyName = companyName.trim();
  const normalizedType = (licenseOrFacilityType || 'AGRONOMIST')
    .trim()
    .toUpperCase();

  const facilities: FacilityRecord[] = [];
  const inventory: InventoryItemRecord[] = [];

  const facilityId = `fac-${cleanCompanyId.toLowerCase()}-01`;

  switch (normalizedType) {
    case 'FORESTER':
    case 'LUMBER_CAMP':
      facilities.push({
        id: facilityId,
        name: `${cleanCompanyName} Lumber Camp #1`,
        facilityType: 'LUMBER_CAMP',
        nodeId: startingNodeId || 'node_pinewood',
        level: 1,
      });
      inventory.push({
        itemType: 'TIMBER',
        quantity: 40,
        quality: 50.0,
      });
      break;

    case 'SAWMILL':
      facilities.push({
        id: facilityId,
        name: `${cleanCompanyName} Sawmill #1`,
        facilityType: 'SAWMILL',
        nodeId: startingNodeId || 'node_pinewood',
        level: 1,
      });
      inventory.push({
        itemType: 'TIMBER',
        quantity: 40,
        quality: 50.0,
      });
      break;

    case 'INDUSTRIALIST':
    case 'IRON_MINE':
      facilities.push({
        id: facilityId,
        name: `${cleanCompanyName} Extraction Site #1`,
        facilityType: 'IRON_MINE',
        nodeId: startingNodeId || 'node_ironridge',
        level: 1,
      });
      inventory.push({
        itemType: 'IRON_ORE',
        quantity: 30,
        quality: 60.0,
      });
      break;

    case 'SMELTER':
      facilities.push({
        id: facilityId,
        name: `${cleanCompanyName} Smelter #1`,
        facilityType: 'SMELTER',
        nodeId: startingNodeId || 'node_ironridge',
        level: 1,
      });
      inventory.push({
        itemType: 'IRON_ORE',
        quantity: 30,
        quality: 60.0,
      });
      break;

    case 'FLOUR_MILL':
      facilities.push({
        id: facilityId,
        name: `${cleanCompanyName} Flour Mill #1`,
        facilityType: 'FLOUR_MILL',
        nodeId: startingNodeId || 'node_millbrook',
        level: 1,
      });
      inventory.push({
        itemType: 'GRAIN',
        quantity: 50,
        quality: 55.0,
      });
      break;

    case 'AGRONOMIST':
    case 'GRAIN_FARM':
    default:
      facilities.push({
        id: facilityId,
        name: `${cleanCompanyName} Agro Farm #1`,
        facilityType: 'GRAIN_FARM',
        nodeId: startingNodeId || 'node_millbrook',
        level: 1,
      });
      inventory.push({
        itemType: 'GRAIN',
        quantity: 50,
        quality: 55.0,
      });
      break;
  }

  return { facilities, inventory };
}
