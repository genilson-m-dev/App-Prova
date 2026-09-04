import { prismaDB } from "../../lib/prisma";

export async function getThemes() {
  const themes = await prismaDB.theme.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return themes;
}

export async function getThemeById(id: unknown) {
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
  });

  if (!theme) {
    throw new Error("Theme não encontrado.");
  }

  return theme;
}