import { Request, Response } from "express";
import { deleteTheme } from "../../services/theme/delete-theme.service";

export async function deleteThemeController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;

    await deleteTheme(id);

    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao excluir Theme:", error);

    if (!(error instanceof Error)) {
      return res.status(500).json({
        error: "Erro interno ao excluir Theme.",
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

    if (
      error.message ===
      "Não é possível excluir um Theme que possui Subjects."
    ) {
      return res.status(409).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: "Erro interno ao excluir Theme.",
    });
    
  }
}