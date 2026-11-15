import type {
  FacilitySummary,
  InventoryItemSummary,
} from '@/libs/store/authSlice';

export type FacilityCategory =
  | 'EXTRACTOR'
  | 'PROCESSOR'
  | 'MANUFACTURER'
  | 'GENERAL';

export type KnownFacilityType =
  | 'GRAIN_FARM'
  | 'LUMBER_CAMP'
  | 'IRON_MINE'
  | 'STONE_QUARRY'
  | 'FLOUR_MILL'
  | 'BAKERY'
  | 'SAWMILL'
  | 'CARPENTRY_WORKSHOP'
  | 'SMELTER'
  | 'BRICK_KILN'
  | 'TOOLSMITH'
  | 'CONSTRUCTION_YARD';

export interface FacilityRecipeIO {
  itemType: string;
  quantity: number;
}

export interface FacilitySpec {
  facilityType: string;
  label: string;
  category: FacilityCategory;
  sector: string;
  description: string;
  baseMaintenance: number;
  inputs: FacilityRecipeIO[];
  outputs: FacilityRecipeIO[];
}

export interface FacilityPortfolioSummary {
  totalFacilities: number;
  activeFacilities: number;
  totalBaseMaintenance: number;
  byCategory: Record<FacilityCategory, number>;
}

export const FACILITY_CATALOG: Record<KnownFacilityType, FacilitySpec> = {
  GRAIN_FARM: {
    facilityType: 'GRAIN_FARM',
    label: 'Grain Farm',
    category: 'EXTRACTOR',
    sector: 'AGRICULTURE',
    description: 'Harvests raw grain directly from arable deposit nodes.',
    baseMaintenance: 20,
    inputs: [],
    outputs: [{ itemType: 'GRAIN', quantity: 20 }],
  },
  LUMBER_CAMP: {
    facilityType: 'LUMBER_CAMP',
    label: 'Lumber Camp',
    category: 'EXTRACTOR',
    sector: 'FORESTRY',
    description: 'Harvests raw timber logs from forest deposit nodes.',
    baseMaintenance: 20,
    inputs: [],
    outputs: [{ itemType: 'TIMBER', quantity: 15 }],
  },
  IRON_MINE: {
    facilityType: 'IRON_MINE',
    label: 'Iron Mine',
    category: 'EXTRACTOR',
    sector: 'METALLURGY',
    description: 'Extracts raw iron ore from mineral vein deposit nodes.',
    baseMaintenance: 30,
    inputs: [],
    outputs: [{ itemType: 'IRON_ORE', quantity: 10 }],
  },
  STONE_QUARRY: {
    facilityType: 'STONE_QUARRY',
    label: 'Stone Quarry',
    category: 'EXTRACTOR',
    sector: 'CONSTRUCTION',
    description: 'Quarries raw structural stone from rock deposit nodes.',
    baseMaintenance: 25,
    inputs: [],
    outputs: [{ itemType: 'STONE', quantity: 15 }],
  },
  FLOUR_MILL: {
    facilityType: 'FLOUR_MILL',
    label: 'Flour Mill',
    category: 'PROCESSOR',
    sector: 'AGRICULTURE',
    description:
      'Milling installation that grinds raw grain into refined flour.',
    baseMaintenance: 20,
    inputs: [{ itemType: 'GRAIN', quantity: 2 }],
    outputs: [{ itemType: 'FLOUR', quantity: 1 }],
  },
  BAKERY: {
    facilityType: 'BAKERY',
    label: 'Bakery',
    category: 'MANUFACTURER',
    sector: 'AGRICULTURE',
    description:
      'Bakes refined flour into consumer bread loaves for settlement retail markets.',
    baseMaintenance: 30,
    inputs: [{ itemType: 'FLOUR', quantity: 1 }],
    outputs: [{ itemType: 'BREAD', quantity: 2 }],
  },
  SAWMILL: {
    facilityType: 'SAWMILL',
    label: 'Sawmill',
    category: 'PROCESSOR',
    sector: 'FORESTRY',
    description: 'Cuts raw timber logs into structural wooden planks.',
    baseMaintenance: 25,
    inputs: [{ itemType: 'TIMBER', quantity: 2 }],
    outputs: [{ itemType: 'PLANKS', quantity: 2 }],
  },
  CARPENTRY_WORKSHOP: {
    facilityType: 'CARPENTRY_WORKSHOP',
    label: 'Carpentry Workshop',
    category: 'MANUFACTURER',
    sector: 'FORESTRY',
    description:
      'Crafts finished household furniture from structural wooden planks.',
    baseMaintenance: 35,
    inputs: [{ itemType: 'PLANKS', quantity: 2 }],
    outputs: [{ itemType: 'FURNITURE', quantity: 1 }],
  },
  SMELTER: {
    facilityType: 'SMELTER',
    label: 'Smelter',
    category: 'PROCESSOR',
    sector: 'METALLURGY',
    description:
      'Refines raw iron ore in high-temperature furnaces into iron ingots.',
    baseMaintenance: 50,
    inputs: [{ itemType: 'IRON_ORE', quantity: 2 }],
    outputs: [{ itemType: 'IRON_INGOT', quantity: 1 }],
  },
  BRICK_KILN: {
    facilityType: 'BRICK_KILN',
    label: 'Brick Kiln',
    category: 'PROCESSOR',
    sector: 'CONSTRUCTION',
    description:
      'Fires quarried stone into standardized structural masonry bricks.',
    baseMaintenance: 30,
    inputs: [{ itemType: 'STONE', quantity: 2 }],
    outputs: [{ itemType: 'BRICKS', quantity: 2 }],
  },
  TOOLSMITH: {
    facilityType: 'TOOLSMITH',
    label: 'Toolsmith',
    category: 'MANUFACTURER',
    sector: 'METALLURGY',
    description:
      'Forges industrial tools and harvesting equipment from iron ingots and planks.',
    baseMaintenance: 45,
    inputs: [
      { itemType: 'IRON_INGOT', quantity: 1 },
      { itemType: 'PLANKS', quantity: 1 },
    ],
    outputs: [{ itemType: 'TOOLS', quantity: 2 }],
  },
  CONSTRUCTION_YARD: {
    facilityType: 'CONSTRUCTION_YARD',
    label: 'Construction Yard',
    category: 'MANUFACTURER',
    sector: 'CONSTRUCTION',
    description:
      'Assembles modular building kits from iron ingots, masonry bricks, and wooden planks.',
    baseMaintenance: 60,
    inputs: [
      { itemType: 'IRON_INGOT', quantity: 2 },
      { itemType: 'BRICKS', quantity: 4 },
      { itemType: 'PLANKS', quantity: 4 },
    ],
    outputs: [{ itemType: 'BUILDING_KIT', quantity: 1 }],
  },
};

export const DEFAULT_FACILITY_SPEC: FacilitySpec = {
  facilityType: 'UNKNOWN',
  label: 'Industrial Installation',
  category: 'GENERAL',
  sector: 'GENERAL',
  description:
    'Standard industrial installation registered on the corporate charter.',
  baseMaintenance: 20,
  inputs: [],
  outputs: [],
};

function formatFacilityTypeLabel(rawType: string): string {
  const cleaned = rawType.trim();
  if (!cleaned) return DEFAULT_FACILITY_SPEC.label;
  return cleaned
    .toLowerCase()
    .split('_')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getFacilitySpec(facilityType: string): FacilitySpec {
  const normalized = facilityType.trim().toUpperCase();
  if (normalized in FACILITY_CATALOG) {
    return FACILITY_CATALOG[normalized as KnownFacilityType];
  }

  return {
    ...DEFAULT_FACILITY_SPEC,
    facilityType: normalized || DEFAULT_FACILITY_SPEC.facilityType,
    label: formatFacilityTypeLabel(normalized),
  };
}

export function formatRecipeIOList(items: FacilityRecipeIO[]): string {
  if (items.length === 0) {
    return 'NONE (RAW DEPOSIT HARVEST)';
  }
  return items.map((item) => `${item.quantity}x ${item.itemType}`).join(' + ');
}

export function formatRecipeSummary(spec: FacilitySpec): string {
  if (spec.outputs.length === 0) {
    return 'STANDARD INDUSTRIAL OPERATION';
  }

  const outputText = spec.outputs
    .map((item) => `${item.quantity}x ${item.itemType}`)
    .join(' + ');

  if (spec.inputs.length === 0) {
    return `HARVEST → ${outputText} / BATCH`;
  }

  const inputText = spec.inputs
    .map((item) => `${item.quantity}x ${item.itemType}`)
    .join(' + ');

  return `${inputText} → ${outputText} / BATCH`;
}

export function calculatePortfolioSummary(
  facilities: FacilitySummary[]
): FacilityPortfolioSummary {
  const byCategory: Record<FacilityCategory, number> = {
    EXTRACTOR: 0,
    PROCESSOR: 0,
    MANUFACTURER: 0,
    GENERAL: 0,
  };

  let totalBaseMaintenance = 0;

  for (const facility of facilities) {
    const spec = getFacilitySpec(facility.facilityType);
    byCategory[spec.category] += 1;
    totalBaseMaintenance += spec.baseMaintenance;
  }

  return {
    totalFacilities: facilities.length,
    activeFacilities: facilities.length,
    totalBaseMaintenance,
    byCategory,
  };
}

export function getAssociatedInventoryForFacility(
  spec: FacilitySpec,
  inventory: InventoryItemSummary[]
): InventoryItemSummary[] {
  const relevantTypes = new Set<string>();

  for (const input of spec.inputs) {
    relevantTypes.add(input.itemType.toUpperCase());
  }
  for (const output of spec.outputs) {
    relevantTypes.add(output.itemType.toUpperCase());
  }

  if (relevantTypes.size === 0) {
    return [];
  }

  return inventory.filter((item) =>
    relevantTypes.has(item.itemType.trim().toUpperCase())
  );
}
