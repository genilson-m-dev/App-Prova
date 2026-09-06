import { prismaDB } from "../../lib/prisma";

export async function updateSubject(
  id: unknown,
  name: unknown,
  themeId: unknown
) {
  if (typeof id !== "string") {
    throw new Error("O id do Subject deve ser uma string.");
  }

  if (typeof name !== "string") {
    throw new Error("O nome do Subject deve ser uma string.");
  }

  if (typeof themeId !== "string") {
    throw new Error("O themeId deve ser uma string.");
  }

  const normalizedId = id.trim();
  const normalizedName = name.trim();
  const normalizedThemeId = themeId.trim();

  if (!normalizedId) {
    throw new Error("O id do Subject é obrigatório.");
  }

  if (!normalizedName) {
    throw new Error("O nome do Subject é obrigatório.");
  }

  if (!normalizedThemeId) {
    throw new Error("O themeId é obrigatório.");
  }

  if (normalizedName.length > 100) {
    throw new Error(
      "O nome do Subject deve ter no máximo 100 caracteres."
    );
  }

  const subject = await prismaDB.subject.findUnique({
    where: {
      id: normalizedId,
    },
  });

  if (!subject) {
    throw new Error("Subject não encontrado.");
  }

  const theme = await prismaDB.theme.findUnique({
    where: {
      id: normalizedThemeId,
    },
  });

  if (!theme) {
    throw new Error("Theme não encontrado.");
  }

  const existingSubject = await prismaDB.subject.findFirst({
    where: {
      name: normalizedName,
      themeId: normalizedThemeId,
      NOT: {
        id: normalizedId,
      },
    },
  });

  if (existingSubject) {
    throw new Error(
      "Já existe um Subject com esse nome neste Theme."
    );
  }

  const updatedSubject = await prismaDB.subject.update({
    where: {
      id: normalizedId,
    },
    data: {
      name: normalizedName,
      themeId: normalizedThemeId,
    },
  });

  return updatedSubject;
}