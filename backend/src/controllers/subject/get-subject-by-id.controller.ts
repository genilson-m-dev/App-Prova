import { Request, Response } from "express";
import { getSubjectById } from "../../services/subject/get-subject-by-id.service";

export async function getSubjectByIdController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;

    const subject = await getSubjectById(id);

    return res.status(200).json({
      data: subject,
    });
  } catch (error) {
    console.error("Erro ao buscar Subject por ID:", error);

    if (!(error instanceof Error)) {
      return res.status(500).json({
        error: "Erro interno ao buscar Subject.",
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

    return res.status(500).json({
      error: "Erro interno ao buscar Subject.",
    });
  }
}