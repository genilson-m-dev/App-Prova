import { prismaDB } from "../../lib/prisma";

export async function deleteSubject(id: unknown) {
  if (typeof id !== "string") {
    throw new Error("O id do Subject deve ser uma string.");
  }

  const normalizedId = id.trim();

  if (!normalizedId) {
    throw new Error("O id do Subject é obrigatório.");
  }

  const subject = await prismaDB.subject.findUnique({
    where: {
      id: normalizedId,
    },
  });

  if (!subject) {
    throw new Error("Subject não encontrado.");
  }

  const questions = await prismaDB.question.count({
    where: {
      subjectId: normalizedId,
    },
  });

  if (questions > 0) {
    throw new Error(
      "Não é possível excluir o Subject porque existem Questions vinculadas a ele."
    );
  }

  await prismaDB.subject.delete({
    where: {
      id: normalizedId,
    },
  });

  return subject;
}