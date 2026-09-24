"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateThemeController = updateThemeController;
const update_theme_service_1 = require("../../services/theme/update-theme.service");
async function updateThemeController(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const theme = await (0, update_theme_service_1.updateTheme)(id, name);
        return res.status(200).json({
            data: theme,
        });
    }
    catch (error) {
        console.error("Erro ao atualizar Theme:", error);
        if (!(error instanceof Error)) {
            return res.status(500).json({
                error: "Erro interno ao atualizar Theme.",
            });
        }
        const badRequestErrors = [
            "O id do Theme deve ser uma string.",
            "O id do Theme é obrigatório.",
            "O nome do Theme deve ser uma string.",
            "O nome do Theme é obrigatório.",
            "O nome do Theme deve ter no máximo 100 caracteres.",
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
        if (error.message === "Já existe um Theme com esse nome.") {
            return res.status(409).json({
                error: error.message,
            });
        }
        return res.status(500).json({
            error: "Erro interno ao atualizar Theme.",
        });
    }
}
//# sourceMappingURL=update-theme.controller.js.map