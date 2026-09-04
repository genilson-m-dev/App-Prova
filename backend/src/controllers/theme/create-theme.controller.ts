import { Request, Response } from "express";
import { createTheme } from "../../services/theme/create-theme.service";

export async function createThemeController(
  req: Request,
  res: Response
) {
  try {
    const { name } = req.body;

    const theme = await createTheme(name);

    return res.status(201).json({
      data: theme,
    });
  } catch (error) {
    console.error("Erro ao criar Theme:", error);

    if (!(error instanceof Error)) {
      return res.status(500).json({
        error: "Erro interno ao criar Theme.",
      });
    }

    const badRequestErrors = [
      "O nome do Theme deve ser uma string.",
      "O nome do Theme é obrigatório.",
      "O nome do Theme deve ter no máximo 100 caracteres.",
    ];

    if (badRequestErrors.includes(error.message)) {
      return res.status(400).json({
        error: error.message,
      });
    }

    if (error.message === "Já existe um Theme com esse nome.") {
      return res.status(409).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: "Erro interno ao criar Theme.",
    });
  }
}