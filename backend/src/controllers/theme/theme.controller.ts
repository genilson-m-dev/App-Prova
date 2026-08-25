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
    console.error("Erro ao buscar Themes:", error);

    return res.status(500).json({
      error: "Erro interno ao buscar Themes.",
    });
  }
}

export async function createThemeController(req: Request, res: Response) {
  try {
    const { name } = req.body;

    const theme = await createTheme(name);

    return res.status(201).json({
      data: theme,
    });
  } catch (error) {
    console.error("Erro ao criar Theme:", error);

    if (
      error instanceof Error &&
      error.message === "O nome do Theme deve ser uma string."
    ) {
      return res.status(400).json({
        error: error.message,
      });
    }

    if (
      error instanceof Error &&
      error.message === "O nome do Theme deve ter no máximo 100 caracteres."
    ) {
      return res.status(400).json({
        error: error.message,
      });
    }

    if (
      error instanceof Error &&
      error.message === "O nome do Theme é obrigatório."
    ) {
      return res.status(400).json({
        error: error.message,
      });
    }

    if (
      error instanceof Error &&
      error.message === "Já existe um Theme com esse nome."
    ) {
      return res.status(409).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: "Erro interno ao criar Theme.",
    });
  }
}
