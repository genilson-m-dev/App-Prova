import { prismaDB } from "../../lib/prisma";

export async function createTheme(name: unknown) {
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

    const existingTheme = await prismaDB.theme.findUnique({
        where: {
            name: normalizedName,
        },
    });

    if (existingTheme) {
        throw new Error("Já existe um Theme com esse nome.");
    }
    

    const theme = await prismaDB.theme.create({
        data: {
            name: normalizedName,
        },
    });

    return theme;
}

export async function getThemeById(id: unknown) {
    if (typeof id !== "string") {
        throw new Error("O id do Theme deve ser uma string.");
    }

    const normalizedId = id.trim();

    if (!normalizedId) {
        throw new Error("O id do Theme é obrigatório.");
    }

    const theme = await prismaDB.theme.findUnique({
        where: {
            id: normalizedId,
        },
    });

    if (!theme) {
        throw new Error("Theme não encontrado.");
    }

    return theme;
}
