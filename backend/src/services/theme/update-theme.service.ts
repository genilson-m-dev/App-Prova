import { prismaDB } from "../../lib/prisma";

export async function updateTheme(
  id: unknown,
  name: unknown
) {
  if (typeof id !== "string") {
    throw new Error("O id do Theme deve ser uma string.");
  }

  if (typeof name !== "string") {
    throw new Error("O nome do Theme deve ser uma string.");
  }

  const normalizedId = id.trim();
  const normalizedName = name.trim();

  if (!normalizedId) {
    throw new Error("O id do Theme é obrigatório.");
  }

  if (!normalizedName) {
    throw new Error("O nome do Theme é obrigatório.");
  }

  if (normalizedName.length > 100) {
    throw new Error(
      "O nome do Theme deve ter no máximo 100 caracteres."
    );
  }

  const theme = await prismaDB.theme.findUnique({
    where: {
      id: normalizedId,
    },
  });

  if (!theme) {
    throw new Error("Theme não encontrado.");
  }

  const existingTheme = await prismaDB.theme.findUnique({
    where: {
      name: normalizedName,
    },
  });

  if (existingTheme && existingTheme.id !== normalizedId) {
    throw new Error("Já existe um Theme com esse nome.");
  }

  const updatedTheme = await prismaDB.theme.update({
    where: {
      id: normalizedId,
    },
    data: {
      name: normalizedName,
    },
  });

  return updatedTheme;
}