import { Request, Response } from "express";
import { prismaDB } from "../../lib/prisma";
import { createTheme } from "../../services/theme/theme.service";

import {
    getThemes as getThemesService,
    getThemeById,
} from "../../services/theme/theme.service";

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

export async function getThemeByIdController(
    req: Request,
    res: Response
) {
    try {
        const { id } = req.params;

        const theme = await getThemeById(id);

        return res.status(200).json({
            data: theme,
        });
    } catch (error) {
        console.error("Erro ao buscar Theme:", error);

        if (!(error instanceof Error)) {
            return res.status(500).json({
                error: "Erro interno ao buscar Theme.",
            });
        }

        if (
            error.message === "O id do Theme deve ser uma string." ||
            error.message === "O id do Theme é obrigatório."
        ) {
            return res.status(400).json({
                error: error.message,
            });
        }

        if (error.message === "Theme não encontrado.") {
            return res.status(404).json({
                error: error.message,
            });
        }

        return res.status(500).json({
            error: "Erro interno ao buscar Theme.",
        });
    }
}
