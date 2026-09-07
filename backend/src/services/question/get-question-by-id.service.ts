import { prismaDB } from "../../lib/prisma";

export async function getQuestionById(id: unknown) {
  if (typeof id !== "string") {
    throw new Error("O id deve ser uma string.");
  }

  const normalizedId = id.trim();

  if (!normalizedId) {
    throw new Error("O id é obrigatório.");
  }

  const question = await prismaDB.question.findUnique({
    where: {
      id: normalizedId,
    },
    include: {
      options: true,
      subject: true,
    },
  });

  if (!question) {
    throw new Error("Question não encontrada.");
  }

  return question;
}