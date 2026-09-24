"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestionController = createQuestionController;
const create_question_service_1 = require("../../services/question/create-question.service");
async function createQuestionController(req, res) {
    try {
        const questions = await (0, create_question_service_1.createQuestion)(req.body);
        return res.status(201).json({
            data: questions,
            count: questions.length,
        });
    }
    catch (error) {
        console.error("Erro ao criar Questions:", error);
        /**
         * Erros de validação da Fase 1
         */
        if (error instanceof
            create_question_service_1.QuestionBatchValidationError) {
            return res.status(400).json({
                error: error.message,
                details: error.details,
            });
        }
        /**
         * Erro inesperado
         */
        return res.status(500).json({
            error: "Erro interno ao criar Questions.",
        });
    }
}
//# sourceMappingURL=create-question.controller.js.map