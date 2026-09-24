"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTheme = createTheme;
exports.getThemeById = getThemeById;
const prisma_1 = require("../../lib/prisma");
async function createTheme(name) {
    if (typeof name !== "string") {
        throw new Error("O nome do Theme deve ser uma string.");
    }
    const normalizedName = name.trim();
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
async function getThemeById(id) {
    if (typeof id !== "string") {
        throw new Error("O id do Theme deve ser uma string.");
    }
    const normalizedId = id.trim();
    if (!normalizedId) {
        throw new Error("O id do Theme é obrigatório.");
    }
    const theme = await prisma_1.prismaDB.theme.findUnique({
        where: {
            id: normalizedId,
        },
    });
    if (!theme) {
        throw new Error("Theme não encontrado.");
    }
    return theme;
}
//# sourceMappingURL=theme.service.js.map