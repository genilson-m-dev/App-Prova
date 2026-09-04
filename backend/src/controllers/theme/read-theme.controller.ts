import { Request, Response } from "express";

import {
  getThemes,
  getThemeById,
} from "../../services/theme/read-theme.service";

export async function getThemesController(_req: Request, res: Response) {
  try {
    const themes = await getThemes();

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

export async function getThemeByIdController(req: Request, res: Response) {
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
