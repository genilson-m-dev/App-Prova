import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,


// o ! é uma afirmação para o TypeScript de que essa variável estará definida em tempo de execução.
});

export const prismaDB = new PrismaClient({ adapter });
