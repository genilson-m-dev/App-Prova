import { Request, Response } from "express";

import { deleteSubject } from "../../services/subject/detele-subject.service";

export async function deleteSubjectController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;

    const subject = await deleteSubject(id);

    return res.status(200).json({
      message: "Subject excluído com sucesso.",
      data: subject,
    });
  } catch (error) {
    console.error("Erro ao excluir Subject:", error);

    if (!(error instanceof Error)) {
      return res.status(500).json({
        error: "Erro interno ao excluir Subject.",
      });
    }

    if (
      error.message === "O id do Subject deve ser uma string." ||
      error.message === "O id do Subject é obrigatório."
    ) {
      return res.status(400).json({
        error: error.message,
      });
    }

    if (error.message === "Subject não encontrado.") {
      return res.status(404).json({
        error: error.message,
      });
    }

    if (
      error.message ===
      "Não é possível excluir o Subject porque existem Questions vinculadas a ele."
    ) {
      return res.status(409).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: "Erro interno ao excluir Subject.",
    });
  }
}