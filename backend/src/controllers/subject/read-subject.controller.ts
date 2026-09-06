import { Request, Response } from "express";
// import { getSu, getThemeById } from "../../services/theme/readt-theme.service";
import { getSubjects, getSubject } from "../../services/subject/read-subject.service";
export async function getSubjectsController(_req: Request, res: Response) {
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

export async function getSubjectByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const subject = await getSubject(id);

    return res.status(200).json({
      data: subject,
    });
  } catch (error) {
    console.error("Erro ao buscar Subject:", error);

    if (!(error instanceof Error)) {
      return res.status(500).json({
        error: "Erro interno ao buscar Subject.",
      });
    }

    if (
      error.message === "O id do Subject deve ser uma string." ||
      error.message === "O id do Subject é obrigatório."
    ) {
      return res.status(400).json({
        error: error.message,
      });
    }

    if (error.message === "Subject não encontrado.") {
      return res.status(404).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: "Erro interno ao buscar Subject.",
    });
  }
}
