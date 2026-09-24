"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThemes = getThemes;
exports.getThemeById = getThemeById;
const prisma_1 = require("../../lib/prisma");
async function getThemes() {
    const themes = await prisma_1.prismaDB.theme.findMany({
        orderBy: {
            name: "asc",
        },
    });
    return themes;
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
//# sourceMappingURL=readt-theme.service.js.map