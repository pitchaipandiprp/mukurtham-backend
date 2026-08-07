import fs from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function runSchema() {
    try {
        const filePath = path.join(process.cwd(), "database/schema.sql");

        const sql = await fs.readFile(filePath, "utf8");

        const queries = sql
            .split(";")
            .map((query) => query.trim())
            .filter(Boolean);

        for (const query of queries) {
            await prisma.$executeRawUnsafe(query);
        }

        console.log("Database schema executed successfully.");
    } catch (error) {
        console.error("Schema execution failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

// Execute when this file is run directly
await runSchema();