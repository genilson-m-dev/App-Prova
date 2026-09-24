"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTheme = createTheme;
const prisma_1 = require("../../lib/prisma");
async function createTheme(name) {
    if (typeof name !== "string" && name !== undefined && name !== null) {
        throw new Error("O nome do Theme deve ser uma string e não pode ser \"\".");
    }
    const normalizedName = name?.trim();
    if (!normalizedName) {
        throw new Error("O nome do Theme é obrigatório.");
    }
    if (normalizedName.length > 100) {
        throw new Error("O nome do Theme deve ter no máximo 100 caracteres.");
    }
    const existingTheme = await prisma_1.prismaDB.theme.findUnique({
        where: {
            name: normalizedName,
        },
    });
    if (existingTheme) {
        throw new Error("Já existe um Theme com esse nome.");
    }
    const theme = await prisma_1.prismaDB.theme.create({
        data: {
            name: normalizedName,
        },
    });
    return theme;
}
//# sourceMappingURL=create-theme.service.js.map