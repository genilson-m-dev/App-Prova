"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteThemeController = deleteThemeController;
const delete_theme_service_1 = require("../../services/theme/delete-theme.service");
async function deleteThemeController(req, res) {
    try {
        const { id } = req.params;
        await (0, delete_theme_service_1.deleteTheme)(id);
        return res.status(204).send();
    }
    catch (error) {
        console.error("Erro ao excluir Theme:", error);
        if (!(error instanceof Error)) {
            return res.status(500).json({
                error: "Erro interno ao excluir Theme.",
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
        if (error.message ===
            "Não é possível excluir um Theme que possui Subjects.") {
            return res.status(409).json({
                error: error.message,
            });
        }
        return res.status(500).json({
            error: "Erro interno ao excluir Theme.",
        });
    }
}
//# sourceMappingURL=delete-theme.controller.js.map