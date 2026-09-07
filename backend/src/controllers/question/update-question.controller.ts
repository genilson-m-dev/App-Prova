import { Request, Response } from "express";
import { updateQuestion } from "../../services/question/update-question.service";

export async function updateQuestionController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params; //LKJ5587999939131

    const {
      statement,
      explanation,
      difficulty,
      type,
      bank,
      subjectId,
      options,
    } = req.body;

    const question = await updateQuestion(
      id,
      statement,
      explanation,
      difficulty,
      type,
      bank,
      subjectId,
      options
    );

    return res.status(200).json({
      data: question,
    });
  } catch (error) {
    console.error("Erro ao atualizar Question:", error);

    if (!(error instanceof Error)) {
      return res.status(500).json({
        error: "Erro interno ao atualizar Question.",
      });
    }

    const badRequestErrors = [
      "O id deve ser uma string.",
      "O statement deve ser uma string.",
      "A explanation deve ser uma string.",
      "A difficulty deve ser uma string.",
      "O type deve ser uma string.",
      "O bank deve ser uma string.",
      "O subjectId deve ser uma string.",
      "As options devem ser um array.",
      "O id é obrigatório.",
      "O statement é obrigatório.",
      "A explanation é obrigatória.",
      "A difficulty é obrigatória.",
      "O type é obrigatório.",
      "O bank é obrigatório.",
      "O subjectId é obrigatório.",
      "A difficulty deve ser BEGINNER, MEDIUM ou HARD.",
      "O type deve ser TRUE_FALSE, MULTIPLE_CHOICE ou MULTIPLE_ANSWER.",
      "O bank deve ser CEBRASPE, FCC, CENSAGRARIO ou OTHER.",
      "A Question deve possuir pelo menos uma option.",
      "Cada option deve ser um objeto.",
      "O texto de cada option deve ser uma string.",
      "O isCorrect de cada option deve ser boolean.",
      "O texto da option é obrigatório.",
      "Não podem existir options duplicadas na Question.",
      "Uma Question TRUE_FALSE deve possuir exatamente 2 options.",
      "Uma Question TRUE_FALSE deve possuir exatamente 1 option correta.",
      "Uma Question TRUE_FALSE deve possuir exatamente 1 option incorreta.",
      "Uma Question MULTIPLE_CHOICE deve possuir exatamente 5 options.",
      "Uma Question MULTIPLE_CHOICE deve possuir exatamente 1 option correta.",
      "Uma Question MULTIPLE_CHOICE deve possuir exatamente 4 options incorretas.",
      "Uma Question MULTIPLE_ANSWER deve possuir entre 2 e 5 options.",
      "Uma Question MULTIPLE_ANSWER deve possuir entre 2 e 4 options corretas.",
      "Uma Question MULTIPLE_ANSWER deve possuir pelo menos 1 option incorreta.",
      "Questions do banco CEBRASPE devem utilizar o type TRUE_FALSE.",
      "Uma Question CEBRASPE deve possuir as options Certo e Errado.",
    ];

    if (badRequestErrors.includes(error.message)) {
      return res.status(400).json({
        error: error.message,
      });
    }

    if (error.message === "Question não encontrada.") {
      return res.status(404).json({
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
      error: "Erro interno ao atualizar Question.",
    });
  }
}