// lib/prismaDynamic.ts
import { PrismaClient } from "@prisma/client";

type TenantConfig = {
  databaseUrl: string;
};

export function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
}