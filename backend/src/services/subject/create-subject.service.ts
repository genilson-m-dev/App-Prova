import { prismaDB } from "../../lib/prisma";

export async function createSubject(
    name: unknown,
    themeId: unknown
) {
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
        throw new Error(
            "O nome do Subject deve ter no máximo 100 caracteres."
        );
    }

    const theme = await prismaDB.theme.findUnique({
        where: {
            id: normalizedThemeId,
        },
    });

    if (!theme) {
        throw new Error("Theme não encontrado.");
    }

    const existingSubject = await prismaDB.subject.findUnique({
        where: {
            themeId_name: {
                themeId: normalizedThemeId,
                name: normalizedName,
            },
        },
    });

    if (existingSubject) {
        throw new Error(
            "Já existe um Subject com esse nome neste Theme."
        );
    }

    const subject = await prismaDB.subject.create({
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
export async function getSubjects() {
    const subjects = await prismaDB.subject.findMany({
        orderBy: {
            name: "asc",
        },
    });

    return subjects;
}

/**
 * Busca todos os Subjects pertencentes a um Theme.
 */
export async function getSubjectsByTheme(themeId: unknown) {
    if (typeof themeId !== "string") {
        throw new Error("O themeId deve ser uma string.");
    }

    const normalizedThemeId = themeId.trim();

    if (!normalizedThemeId) {
        throw new Error("O themeId é obrigatório.");
    }

    const theme = await prismaDB.theme.findUnique({
        where: {
            id: normalizedThemeId,
        },
    });

    if (!theme) {
        throw new Error("Theme não encontrado.");
    }

    const subjects = await prismaDB.subject.findMany({
        where: {
            themeId: normalizedThemeId,
        },
        orderBy: {
            name: "asc",
        },
    });

    return subjects;
}