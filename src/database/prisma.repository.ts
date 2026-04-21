import { PrismaClient } from "@prisma/client";

const globalPrimaConnection = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalPrimaConnection.prisma ??
    new PrismaClient({
        log: ["error", "warn"]
    })

if (process.env.NODE_ENV !== "production") {
    globalPrimaConnection.prisma = prisma
}