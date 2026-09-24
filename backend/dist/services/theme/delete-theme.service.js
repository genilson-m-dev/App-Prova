"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTheme = deleteTheme;
const prisma_1 = require("../../lib/prisma");
async function deleteTheme(id) {
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
        include: {
            subject: true,
        },
    });
    if (!theme) {
        throw new Error("Theme não encontrado.");
    }
    if (theme.subject.length > 0) {
        throw new Error("Não é possível excluir um Theme que possui Subjects.");
    }
    await prisma_1.prismaDB.theme.delete({
        where: {
            id: normalizedId,
        },
    });
    return theme;
}
//# sourceMappingURL=delete-theme.service.js.map