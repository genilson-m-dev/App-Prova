import { prismaDB } from "../../lib/prisma";

export async function getSubjects() {
  const subjects = await prismaDB.subject.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return subjects;
}

export async function getSubject(id: unknown) {
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

  return subject;
}