---
title: Relational Data Schemas & TypeScript Domain Models
tags:
  - technical
  - schemas
  - typescript
  - prisma
  - database
  - models
type: specification
status: approved
created: 2026-09-12
---

# Relational Data Schemas & TypeScript Domain Models

This document specifies the database schemas (managed via **Prisma ORM** for PostgreSQL) and the shared **TypeScript domain interfaces** used across both the backend server and web frontend.

For system architecture context, see [[system-design-overview]].
For API endpoints and WebSocket messages using these models, see [[api-and-websocket-protocol]].

---

## 1. Prisma ORM Database Schema (`schema.prisma`)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum FacilityCategory {
  EXTRACTOR
  PROCESSOR
  MANUFACTURER
}

enum OrderSide {
  BUY
  SELL
}

enum OrderStatus {
  OPEN
  PARTIALLY_FILLED
  FILLED
  CANCELLED
}

enum ContractStatus {
  ACTIVE
  FULFILLED
  CANCELLED_BREACH
  CANCELLED_MUTUAL
}

enum FreightTerms {
  FOB_ORIGIN
  FOB_DESTINATION
}

model User {
  id           String    @id @default(uuid())
  email        String    @unique
  passwordHash String
  createdAt    DateTime  @default(now())
  company      Company?
}

model Company {
  id             String         @id @default(uuid())
  name           String         @unique
  ticker         String         @unique
  cashBalance    Decimal        @default(25000.0) @db.Decimal(18, 4)
  reputation     Float          @default(100.0)
  userId         String         @unique
  user           User           @relation(fields: [userId], references: [id])
  facilities     Facility[]
  orders         MarketOrder[]
  soldContracts  B2BContract[]  @relation("SellerContracts")
  boughtContracts B2BContract[] @relation("BuyerContracts")
  createdAt      DateTime       @default(now())
}

model MapNode {
  id              String      @id
  name            String
  nodeType        String      // "SETTLEMENT" | "RESOURCE_DEPOSIT"
  coordX          Float
  coordY          Float
  population      Int?
  wealthIndex     Float?      @default(1.0)
  resourceType    String?     // e.g. "GRAIN", "IRON_ORE"
  baseYieldBonus  Float?      @default(1.0)
  depositQuality  Float?      @default(50.0)
  facilities      Facility[]
  orders          MarketOrder[]
}

model Facility {
  id              String           @id @default(uuid())
  name            String
  companyId       String
  company         Company          @relation(fields: [companyId], references: [id])
  nodeId          String
  node            MapNode          @relation(fields: [nodeId], references: [id])
  facilityType    String           // e.g. "GRAIN_FARM", "SMELTER"
  category        FacilityCategory
  level           Int              @default(1)
  recipeId        String?
  techBonus       Float            @default(0.0)
  isOperating     Boolean          @default(true)
  inventory       InventoryItem[]
  createdAt       DateTime         @default(now())

  @@index([companyId])
  @@index([nodeId])
}

model InventoryItem {
  id          String   @id @default(uuid())
  facilityId  String
  facility    Facility @relation(fields: [facilityId], references: [id], onDelete: Cascade)
  itemType    String   // e.g. "IRON_INGOT", "BREAD"
  quantity    Int      @default(0)
  quality     Float    @default(50.0) // Q1.0 - Q100.0

  @@unique([facilityId, itemType])
}

model MarketOrder {
  id                String      @id @default(uuid())
  marketNodeId      String
  marketNode        MapNode     @relation(fields: [marketNodeId], references: [id])
  companyId         String
  company           Company     @relation(fields: [companyId], references: [id])
  side              OrderSide
  itemType          String
  priceLimit        Decimal     @db.Decimal(12, 4)
  quantity          Int
  filledQuantity    Int         @default(0)
  quality           Float?      // Exact quality for SELL
  minQuality        Float?      // Minimum threshold for BUY
  sourceFacilityId  String?
  destFacilityId    String?
  status            OrderStatus @default(OPEN)
  createdTick       BigInt
  expiresTick       BigInt

  @@index([marketNodeId, side, itemType, status])
}

model B2BContract {
  id                 String         @id @default(uuid())
  sellerCompanyId    String
  sellerCompany      Company        @relation("SellerContracts", fields: [sellerCompanyId], references: [id])
  buyerCompanyId     String
  buyerCompany       Company        @relation("BuyerContracts", fields: [buyerCompanyId], references: [id])
  sourceFacilityId   String
  destFacilityId     String
  itemType           String
  quantityPerTick    Int
  unitPrice          Decimal        @db.Decimal(12, 4)
  minQuality         Float
  freightTerms       FreightTerms
  startTick          BigInt
  durationTicks      Int
  consecutiveBreaches Int           @default(0)
  status             ContractStatus @default(ACTIVE)
}

model TickSnapshot {
  tickNumber   BigInt   @id
  timestamp    DateTime @default(now())
  durationMs   Int
  totalTrades  Int
  totalVolume  Decimal  @db.Decimal(18, 4)
  stateHash    String
}
```

---

## 2. Core Shared TypeScript Domain Types

These interfaces are placed in `shared/types/simulation.ts` and compiled by both client and server:

```typescript
export type ItemType =
  | 'GRAIN'
  | 'FLOUR'
  | 'BREAD'
  | 'TIMBER'
  | 'PLANKS'
  | 'FURNITURE'
  | 'IRON_ORE'
  | 'STONE'
  | 'IRON_INGOT'
  | 'BRICKS'
  | 'TOOLS'
  | 'BUILDING_KIT';

export interface InventoryLot {
  itemType: ItemType;
  quantity: number;
  quality: number; // 1.0 - 100.0
}

export interface TickStateDelta {
  tickNumber: number;
  timestamp: number;
  companyDeltas: {
    cashDelta: number;
    inventoryChanges: Array<{
      facilityId: string;
      itemType: ItemType;
      quantityDelta: number;
      newQuality: number;
    }>;
  };
  marketFills: Array<{
    orderId: string;
    itemType: ItemType;
    filledQty: number;
    clearingPrice: number;
    freightFee: number;
  }>;
  facilityOutputs: Array<{
    facilityId: string;
    producedItem: ItemType;
    quantity: number;
    quality: number;
  }>;
}
```

---

## Related Notes
- [[system-design-overview]] - How these models flow through Redis and PostgreSQL.
- [[api-and-websocket-protocol]] - Network wire formats using these models.
- [[company-management]] - Company fields and accounting ledger.
- [[spot-exchange-orderbooks]] - Order models and double auction storage.
