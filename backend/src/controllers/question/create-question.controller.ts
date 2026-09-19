import { Request, Response } from "express";

import {
  createQuestion,
  QuestionBatchValidationError,
} from "../../services/question/create-question.service";

export async function createQuestionController(
  req: Request,
  res: Response
) {
  try {
    const questions = await createQuestion(
      req.body
    );

    return res.status(201).json({
      data: questions,
      count: questions.length,
    });
  } catch (error) {
    console.error(
      "Erro ao criar Questions:",
      error
    );

    /**
     * Erros de validação da Fase 1
     */

    if (
      error instanceof
      QuestionBatchValidationError
    ) {
      return res.status(400).json({
        error: error.message,
        details: error.details,
      });
    }

    /**
     * Erro inesperado
     */

    return res.status(500).json({
      error:
        "Erro interno ao criar Questions.",
    });
  }
}