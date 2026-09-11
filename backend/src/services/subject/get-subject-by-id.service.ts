import { prismaDB } from "../../lib/prisma";

type GetQuestionsBySubjectParams = {
  subjectId: unknown;
  page?: unknown;
  limit?: unknown;
};

export async function getQuestionsBySubject({
  subjectId,
  page = 1,
  limit = 20,
}: GetQuestionsBySubjectParams) {
  // =========================
  // Validação do subjectId
  // =========================

  if (typeof subjectId !== "string") {
    throw new Error("O subjectId deve ser uma string.");
  }

  const normalizedSubjectId = subjectId.trim();

  if (!normalizedSubjectId) {
    throw new Error("O subjectId é obrigatório.");
  }

  // =========================
  // Validação da página
  // =========================

  const parsedPage = Number(page);

  if (!Number.isInteger(parsedPage) || parsedPage < 1) {
    throw new Error("O page deve ser um número inteiro maior ou igual a 1.");
  }

  // =========================
  // Validação do limite
  // =========================

  const parsedLimit = Number(limit);

  if (!Number.isInteger(parsedLimit) || parsedLimit < 1) {
    throw new Error("O limit deve ser um número inteiro maior ou igual a 1.");
  }

  if (parsedLimit > 50) {
    throw new Error("O limit não pode ser maior que 50.");
  }

  // =========================
  // Verifica se o Subject existe
  // =========================

  const subject = await prismaDB.subject.findUnique({
    where: {
      id: normalizedSubjectId,
    },
  });

  if (!subject) {
    throw new Error("Subject não encontrado.");
  }

  // =========================
  // Calcula paginação
  // =========================

  const skip = (parsedPage - 1) * parsedLimit;

  // =========================
  // Busca Questions + total
  // =========================

  const [questions, total] = await Promise.all([
    prismaDB.question.findMany({
      where: {
        subjectId: normalizedSubjectId,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          id: "desc",
        },
      ],
      skip,
      take: parsedLimit,
      include: {
        options: true,
        subject: true,
      },
    }),

    prismaDB.question.count({
      where: {
        subjectId: normalizedSubjectId,
      },
    }),
  ]);

  // =========================
  // Calcula informações
  // =========================

  const totalPages = Math.ceil(total / parsedLimit);

  const hasNextPage = parsedPage < totalPages;

  const hasPreviousPage = parsedPage > 1;

  // =========================
  // Retorno
  // =========================

  return {
    data: questions,
    pagination: {
      page: parsedPage,
      limit: parsedLimit,
      total,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    },
  };
}