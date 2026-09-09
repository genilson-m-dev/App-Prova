import { prismaDB } from "../../lib/prisma";

export async function deleteQuestion(id: unknown) {
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
  });

  if (!question) {
    throw new Error("Question não encontrada.");
  }

  await prismaDB.$transaction(async (tx) => {
    await tx.questionOption.deleteMany({
      where: {
        questionId: normalizedId,
      },
    });

    await tx.question.delete({
      where: {
        id: normalizedId,
      },
    });
  });
}