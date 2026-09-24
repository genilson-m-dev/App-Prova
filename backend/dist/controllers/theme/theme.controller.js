"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThemes = getThemes;
exports.createThemeController = createThemeController;
exports.getThemeByIdController = getThemeByIdController;
const prisma_1 = require("../../lib/prisma");
const theme_service_1 = require("../../services/theme/theme.service");
const theme_service_2 = require("../../services/theme/theme.service");
// import {
//     getThemes as getThemesService,
//     getThemeById,
// } from "../../services/theme/theme.service";
async function getThemes(_req, res) {
    try {
        const themes = await prisma_1.prismaDB.theme.findMany();
        return res.status(200).json({
            data: themes,
        });
    }
    catch (error) {
        console.error("Erro ao buscar Themes:", error);
        return res.status(500).json({
            error: "Erro interno ao buscar Themes.",
        });
    }
}
async function createThemeController(req, res) {
    try {
        const { name } = req.body;
        const theme = await (0, theme_service_1.createTheme)(name);
        return res.status(201).json({
            data: theme,
        });
    }
    catch (error) {
        console.error("Erro ao criar Theme:", error);
        if (error instanceof Error &&
            error.message === "O nome do Theme deve ser uma string.") {
            return res.status(400).json({
                error: error.message,
            });
        }
        if (error instanceof Error &&
            error.message === "O nome do Theme deve ter no máximo 100 caracteres.") {
            return res.status(400).json({
                error: error.message,
            });
        }
        if (error instanceof Error &&
            error.message === "O nome do Theme é obrigatório.") {
            return res.status(400).json({
                error: error.message,
            });
        }
        if (error instanceof Error &&
            error.message === "Já existe um Theme com esse nome.") {
            return res.status(409).json({
                error: error.message,
            });
        }
        return res.status(500).json({
            error: "Erro interno ao criar Theme.",
        });
    }
}
async function getThemeByIdController(req, res) {
    try {
        const { id } = req.params;
        const theme = await (0, theme_service_2.getThemeById)(id);
        return res.status(200).json({
            data: theme,
        });
    }
    catch (error) {
        console.error("Erro ao buscar Theme:", error);
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
//# sourceMappingURL=theme.controller.js.map