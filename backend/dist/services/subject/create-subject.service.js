"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubject = createSubject;
exports.getSubjects = getSubjects;
exports.getSubjectsByTheme = getSubjectsByTheme;
const prisma_1 = require("../../lib/prisma");
async function createSubject(name, themeId) {
    if (typeof name !== "string") {
        throw new Error("O nome do Subject deve ser uma string.");
    }
    if (typeof themeId !== "string") {
        throw new Error("O themeId deve ser uma string.");
    }
    const normalizedName = name.trim();
    const normalizedThemeId = themeId.trim();
    if (!normalizedName) {
        throw new Error("O nome do Subject é obrigatório.");
    }
    if (!normalizedThemeId) {
        throw new Error("O themeId é obrigatório.");
    }
    if (normalizedName.length > 100) {
        throw new Error("O nome do Subject deve ter no máximo 100 caracteres.");
    }
    const theme = await prisma_1.prismaDB.theme.findUnique({
        where: {
            id: normalizedThemeId,
        },
    });
    if (!theme) {
        throw new Error("Theme não encontrado.");
    }
    const existingSubject = await prisma_1.prismaDB.subject.findUnique({
        where: {
            themeId_name: {
                themeId: normalizedThemeId,
                name: normalizedName,
            },
        },
    });
    if (existingSubject) {
        throw new Error("Já existe um Subject com esse nome neste Theme.");
    }
    const subject = await prisma_1.prismaDB.subject.create({
        data: {
            name: normalizedName,
            themeId: normalizedThemeId,
        },
    });
    return subject;
}
/**
 * Busca todos os Subjects cadastrados.
 */
async function getSubjects() {
    const subjects = await prisma_1.prismaDB.subject.findMany({
        orderBy: {
            name: "asc",
        },
    });
    return subjects;
}
/**
 * Busca todos os Subjects pertencentes a um Theme.
 */
async function getSubjectsByTheme(themeId) {
    if (typeof themeId !== "string") {
        throw new Error("O themeId deve ser uma string.");
    }
    const normalizedThemeId = themeId.trim();
    if (!normalizedThemeId) {
        throw new Error("O themeId é obrigatório.");
    }
    const theme = await prisma_1.prismaDB.theme.findUnique({
        where: {
            id: normalizedThemeId,
        },
    });
    if (!theme) {
        throw new Error("Theme não encontrado.");
    }
    const subjects = await prisma_1.prismaDB.subject.findMany({
        where: {
            themeId: normalizedThemeId,
        },
        orderBy: {
            name: "asc",
        },
    });
    return subjects;
}
//# sourceMappingURL=create-subject.service.js.map