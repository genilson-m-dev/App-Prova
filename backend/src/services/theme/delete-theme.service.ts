import { prismaDB } from "../../lib/prisma";

export async function deleteTheme(id: unknown) {
  if (typeof id !== "string") {
    throw new Error("O id do Theme deve ser uma string.");
  }

  const normalizedId = id.trim();

  if (!normalizedId) {
    throw new Error("O id do Theme é obrigatório.");
  }

  const theme = await prismaDB.theme.findUnique({
    where: {
      id: normalizedId,
    },
    include: {
      subject: true,
    },
  });

  if (!theme) {
    throw new Error("Theme não encontrado.");
  }

  if (theme.subject.length > 0) {
    throw new Error(
      "Não é possível excluir um Theme que possui Subjects."
    );
  }

  await prismaDB.theme.delete({
    where: {
      id: normalizedId,
    },
  });

  return theme;
}