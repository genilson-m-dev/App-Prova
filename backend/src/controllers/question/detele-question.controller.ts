import { Request, Response } from "express";
// import { deleteQuestion } from "../../services/question/delete-question.service";
import { deleteQuestion } from "../../services/question/detele-question.service";

export async function deleteQuestionController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;

    await deleteQuestion(id);

    return res.status(200).json({
      message: "Question excluída com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao excluir Question:", error);

    if (!(error instanceof Error)) {
      return res.status(500).json({
        error: "Erro interno ao excluir Question.",
      });
    }

    if (
      error.message === "O id deve ser uma string." ||
      error.message === "O id é obrigatório."
    ) {
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
      error: "Erro interno ao excluir Question.",
    });
  }
}