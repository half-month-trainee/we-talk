import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()

export enum PrismaErrorCode {
  UniqueConstants = 'P2002'
}
