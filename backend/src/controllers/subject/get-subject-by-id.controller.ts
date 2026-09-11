import { Request, Response } from "express";

import { getQuestionsBySubject } from "../../services/subject/get-subject-by-id.service";

export async function getSubjectByIdController(
  req: Request,
  res: Response
) {
  try {
    const { subjectId } = req.params;
    const { page, limit } = req.query;

    const result = await getQuestionsBySubject({
      subjectId,
      page,
      limit,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao buscar Subject por ID:", error);

    if (!(error instanceof Error)) {
      return res.status(500).json({
        error: "Erro interno ao buscar Subject por ID.",
      });
    }

    if (
      error.message === "O subjectId deve ser uma string." ||
      error.message === "O subjectId é obrigatório." ||
      error.message ===
        "O page deve ser um número inteiro maior ou igual a 1." ||
      error.message ===
        "O limit deve ser um número inteiro maior ou igual a 1." ||
      error.message === "O limit não pode ser maior que 50."
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

    return res.status(500).json({
      error: "Erro interno ao buscar Questions por Subject.",
    });
  }
}