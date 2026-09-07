import { Request, Response } from "express";
import { createQuestion } from "../../services/question/create-question.service";

export async function createQuestionController(
  req: Request,
  res: Response
) {
  try {
    const {
      statement,
      explanation,
      difficulty,
      subjectId,
    } = req.body;

    const question = await createQuestion(
      statement,
      explanation,
      difficulty,
      subjectId
    );

    return res.status(201).json({
      data: question,
    });
  } catch (error) {
    console.error("Erro ao criar Question:", error);

    if (!(error instanceof Error)) {
      return res.status(500).json({
        error: "Erro interno ao criar Question.",
      });
    }

    const badRequestErrors = [
      "O statement deve ser uma string.",
      "A explanation deve ser uma string.",
      "A difficulty deve ser uma string.",
      "O subjectId deve ser uma string.",
      "O statement é obrigatório.",
      "A explanation é obrigatória.",
      "A difficulty é obrigatória.",
      "O subjectId é obrigatório.",
      "A difficulty deve ser BEGINNER, MEDIUM ou HARD.",
    ];

    if (badRequestErrors.includes(error.message)) {
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
      "Já existe uma Question com esse statement."
    ) {
      return res.status(409).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: "Erro interno ao criar Question.",
    });
  }
}