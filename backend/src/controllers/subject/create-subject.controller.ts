import { Request, Response } from "express";

import { createSubject } from "../../services/subject/create-subject.service";

export async function createSubjectController(
    req: Request,
    res: Response
) {
    try {
        const { name, themeId } = req.body;

        const subject = await createSubject(name, themeId);

        return res.status(201).json({
            data: subject,
        });
    } catch (error) {
        console.error("Erro ao criar Subject:", error);

        if (!(error instanceof Error)) {
            return res.status(500).json({
                error: "Erro interno ao criar Subject.",
            });
        }

        const badRequestErrors = [
            "O nome do Subject deve ser uma string.",
            "O themeId deve ser uma string.",
            "O nome do Subject é obrigatório.",
            "O themeId é obrigatório.",
            "O nome do Subject deve ter no máximo 100 caracteres.",
        ];

        if (badRequestErrors.includes(error.message)) {
            return res.status(400).json({
                error: error.message,
            });
        }

        if (error.message === "Theme não encontrado.") {
            return res.status(404).json({
                error: error.message,
            });
        }

        if (
            error.message ===
            "Já existe um Subject com esse nome neste Theme."
        ) {
            return res.status(409).json({
                error: error.message,
            });
        }

        return res.status(500).json({
            error: "Erro interno ao criar Subject.",
        });
    }
}