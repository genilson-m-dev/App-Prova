import { prismaDB } from "../../lib/prisma";

export async function getSubjectById(id: unknown) {
  if (typeof id !== "string") {
    throw new Error("O id do Subject deve ser uma string.");
  }
  const normalizedId = id.trim();
  
  if (!normalizedId) {
    throw new Error("O id do Subject é obrigatório.");
  }
  const orderedSubjects = await prismaDB.subject.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const subject = await prismaDB.subject.findUnique({
    where: {
      id: normalizedId,
    },
  });

  if (!subject) {
    throw new Error("Subject não encontrado.");
  }

  return subject;
}