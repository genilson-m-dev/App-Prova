"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThemeByIdController = getThemeByIdController;
const readt_theme_service_1 = require("../../services/theme/readt-theme.service");
async function getThemeByIdController(req, res) {
    try {
        const { id } = req.params;
        const theme = await (0, readt_theme_service_1.getThemeById)(id);
        return res.status(200).json({
            data: theme,
        });
    }
    catch (error) {
        console.error("Erro ao buscar Theme por ID:", error);
        if (!(error instanceof Error)) {
            return res.status(500).json({
                error: "Erro interno ao buscar Theme.",
            });
        }
        if (error.message === "O id do Theme deve ser uma string." ||
            error.message === "O id do Theme é obrigatório.") {
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
//# sourceMappingURL=get-themes.by.id.controller.js.map