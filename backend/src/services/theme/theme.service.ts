import { prismaDB } from "../../lib/prisma";

export async function createTheme(name: string) {
    const existingTheme = await prismaDB.theme.findUnique({
        where: {
            name,
        },
    });

    if (existingTheme) {
        return null;
    }

    const theme = await prismaDB.theme.create({
        data: {
            name,
        },
    });

    return theme;
}