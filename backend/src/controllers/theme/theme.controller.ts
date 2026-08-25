import { Request, Response } from "express";
import { prismaDB } from "../../lib/prisma";
import { createTheme } from "../../services/theme/theme.service";

export async function getThemes(_req: Request, res: Response) {
    try {
        const themes = await prismaDB.theme.findMany();

        return res.status(200).json({
            data: themes,
        });
    } catch (error) {
        console.error("Erro ao buscar themes:", error);

        return res.status(500).json({
            error: "Erro interno ao buscar themes",
        });
    }
}

export async function createThemeController(
    req: Request,
    res: Response
) {
    try {
        const { name } = req.body;

        const theme = await createTheme(name);

        if (!theme) {
            return res.status(409).json({
                error: "Já existe um Theme com esse nome.",
            });
        }

        return res.status(201).json({
            data: theme,
        });
    } catch (error) {
        console.error("Erro ao criar Theme:", error);

        return res.status(500).json({
            error: "Erro interno ao criar Theme",
        });
    }
}