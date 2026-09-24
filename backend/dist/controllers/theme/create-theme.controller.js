"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createThemeController = createThemeController;
const create_theme_service_1 = require("../../services/theme/create-theme.service");
async function createThemeController(req, res) {
    try {
        const { name } = req.body;
        const theme = await (0, create_theme_service_1.createTheme)(name);
        return res.status(201).json({
            data: theme,
        });
    }
    catch (error) {
        console.error("Erro ao criar Theme:", error);
        if (!(error instanceof Error)) {
            return res.status(500).json({
                error: "Erro interno ao criar Theme.",
            });
        }
        const badRequestErrors = [
            "O nome do Theme deve ser uma string.",
            "O nome do Theme é obrigatório.",
            "O nome do Theme deve ter no máximo 100 caracteres.",
        ];
        if (badRequestErrors.includes(error.message)) {
            return res.status(400).json({
                error: error.message,
            });
        }
        if (error.message === "Já existe um Theme com esse nome.") {
            return res.status(409).json({
                error: error.message,
            });
        }
        return res.status(500).json({
            error: "Erro interno ao criar Theme.",
        });
    }
}
//# sourceMappingURL=create-theme.controller.js.map