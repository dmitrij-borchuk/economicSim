export interface UserRecord {
  id: string; // Firebase UID
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  createdAt: string;
}

export interface FacilityRecord {
  id: string;
  name: string;
  facilityType: string;
  nodeId: string;
  level: number;
}

export interface InventoryItemRecord {
  itemType: string;
  quantity: number;
  quality: number;
}

export interface CompanyRecord {
  id: string;
  name: string;
  companyId: string;
  cashBalance: number;
  reputation: number;
  userId: string;
  startingNodeId: string;
  facilities: FacilityRecord[];
  inventory?: InventoryItemRecord[];
  createdAt: string;
}

export interface IStorageService {
  getUserById(userId: string): Promise<UserRecord | null>;
  upsertUser(user: UserRecord): Promise<UserRecord>;
  getCompanyByUserId(userId: string): Promise<CompanyRecord | null>;
  getCompanyByCompanyId(companyId: string): Promise<CompanyRecord | null>;
  getCompanyByName(name: string): Promise<CompanyRecord | null>;
  createCompany(company: CompanyRecord): Promise<CompanyRecord>;
}

export const STORAGE_SERVICE = 'STORAGE_SERVICE';
