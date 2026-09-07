import { Request, Response } from "express";
import { getQuestionById } from "../../services/question/get-question-by-id.service";

export async function getQuestionByIdController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;

    const question = await getQuestionById(id);

    return res.status(200).json({
      data: question,
    });
  } catch (error) {
    console.error("Erro ao buscar Question por ID:", error);

    if (!(error instanceof Error)) {
      return res.status(500).json({
        error: "Erro interno ao buscar Question.",
      });
    }

    if (error.message === "O id deve ser uma string.") {
      return res.status(400).json({
        error: error.message,
      });
    }

    if (error.message === "O id é obrigatório.") {
      return res.status(400).json({
        error: error.message,
      });
    }

    if (error.message === "Question não encontrada.") {
      return res.status(404).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: "Erro interno ao buscar Question.",
    });
  }
}