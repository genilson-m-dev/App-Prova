import { Request, Response } from "express";


import { getThemeById } from "../../services/theme/readt-theme.service";
export async function getThemeByIdController(
    req: Request,
    res: Response
) {
    try {
        const { id } = req.params;

        const theme = await getThemeById(id);

        return res.status(200).json({
            data: theme,
        });
    } catch (error) {
        console.error("Erro ao buscar Theme por ID:", error);

        if (!(error instanceof Error)) {
            return res.status(500).json({
                error: "Erro interno ao buscar Theme.",
            });
        }

        if (
            error.message === "O id do Theme deve ser uma string." ||
            error.message === "O id do Theme é obrigatório."
        ) {
            return res.status(400).json({
                error: error.message,
            });
        }

        if (error.message === "Theme não encontrado.") {
            return res.status(404).json({
                error: error.message,
            });
        }

        return res.status(500).json({
            error: "Erro interno ao buscar Theme.",
        });
    }
}