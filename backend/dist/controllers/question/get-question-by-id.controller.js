"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionByIdController = getQuestionByIdController;
const get_question_by_id_service_1 = require("../../services/question/get-question-by-id.service");
async function getQuestionByIdController(req, res) {
    try {
        const { id } = req.params;
        const question = await (0, get_question_by_id_service_1.getQuestionById)(id);
        return res.status(200).json({
            data: question,
        });
    }
    catch (error) {
        console.error("Erro ao buscar Question por ID:", error);
        if (!(error instanceof Error)) {
            return res.status(500).json({
                error: "Erro interno ao buscar Question.",
            });
        }
        if (error.message === "O id deve ser uma string.") {
            return res.status(400).json({
                error: error.message,
            });
        }
        if (error.message === "O id é obrigatório.") {
            return res.status(400).json({
                error: error.message,
            });
        }
        if (error.message === "Question não encontrada.") {
            return res.status(404).json({
                error: error.message,
            });
        }
        return res.status(500).json({
            error: "Erro interno ao buscar Question.",
        });
    }
}
//# sourceMappingURL=get-question-by-id.controller.js.map