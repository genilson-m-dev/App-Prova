import { Request, Response } from "express";
import { getSubjects } from "../../services/subject/read-subject.service";

export async function getSubjectsController(
  _req: Request,
  res: Response
) {
  try {
    const subjects = await getSubjects();

    return res.status(200).json({
      data: subjects,
    });
  } catch (error) {
    console.error("Erro ao buscar Subjects:", error);

    return res.status(500).json({
      error: "Erro interno ao buscar Subjects.",
    });
  }
}