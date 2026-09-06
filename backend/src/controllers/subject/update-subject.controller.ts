import { Request, Response } from "express";
import { updateSubject } from "../../services/subject/update-subject.service";

export async function updateSubjectController(req: Request, res: Response) {
  try {
    const { id } = req.params; //
    const { name, themeId } = req.body;

    const subject = await updateSubject(id, name, themeId);

    return res.status(200).json({
      data: subject,
    });
  } catch (error) {
    console.error("Erro ao atualizar Subject:", error);

    if (!(error instanceof Error)) {
      return res.status(500).json({
        error: "Erro interno ao atualizar Subject.",
      });
    }

    const badRequestErrors = [
      "O id do Subject deve ser uma string.",
      "O id do Subject é obrigatório.",
      "O nome do Subject deve ser uma string.",
      "O nome do Subject é obrigatório.",
      "O themeId deve ser uma string.",
      "O themeId é obrigatório.",
      "O nome do Subject deve ter no máximo 100 caracteres.",
    ];

    if (badRequestErrors.includes(error.message)) {
      return res.status(400).json({
        error: error.message,
      });
    }

    if (
      error.message === "Subject não encontrado." ||
      error.message === "Theme não encontrado."
    ) {
      return res.status(404).json({
        error: error.message,
      });
    }

    if (error.message === "Já existe um Subject com esse nome neste Theme.") {
      return res.status(409).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: "Erro interno ao atualizar Subject.",
    });
  }
}
