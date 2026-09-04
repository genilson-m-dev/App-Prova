import { prismaDB } from "../../lib/prisma";

export async function createTheme(name: unknown) {
  if (typeof name !== "string" && name !== undefined && name !== null) {
    throw new Error("O nome do Theme deve ser uma string e não pode ser .");
  }

  const normalizedName = name?.trim();

  if (!normalizedName) {
    throw new Error("O nome do Theme é obrigatório.");
  }

  if (normalizedName.length > 100) {
    throw new Error(
      "O nome do Theme deve ter no máximo 100 caracteres."
    );
  }

  const existingTheme = await prismaDB.theme.findUnique({
    where: {
      name: normalizedName,
    },
  });

  if (existingTheme) {
    throw new Error("Já existe um Theme com esse nome.");
  }

  const theme = await prismaDB.theme.create({
    data: {
      name: normalizedName,
    },
  });

  return theme;
}