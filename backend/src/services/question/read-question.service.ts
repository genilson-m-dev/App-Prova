import { prismaDB } from "../../lib/prisma";

export async function getQuestions() {
  const questions = await prismaDB.question.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      options: true,
      subject: true,
    },
  });

  return questions;
}