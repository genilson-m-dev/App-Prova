import { Request, Response } from "express";
import { prismaDB } from "../../lib/prisma";

export async function getThemes(_req: Request, res: Response) {
    try {
        const themes = await prismaDB.theme.findMany();
        return res.status(200).json({
            data: themes,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar themas" });
    }

}

