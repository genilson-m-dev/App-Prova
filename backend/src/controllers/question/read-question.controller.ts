import { Request, Response } from "express";
import { getQuestions } from "../../services/question/read-question.service";

export async function getQuestionsController(
  _req: Request,
  res: Response
) {
  try {
    const questions = await getQuestions();

    return res.status(200).json({
      data: questions,
    });
  } catch (error) {
    console.error("Erro ao buscar Questions:", error);

    return res.status(500).json({
      error: "Erro interno ao buscar Questions.",
    });
  }
}