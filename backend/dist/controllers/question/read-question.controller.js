"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionsController = getQuestionsController;
const read_question_service_1 = require("../../services/question/read-question.service");
async function getQuestionsController(_req, res) {
    try {
        const questions = await (0, read_question_service_1.getQuestions)();
        return res.status(200).json({
            data: questions,
        });
    }
    catch (error) {
        console.error("Erro ao buscar Questions:", error);
        return res.status(500).json({
            error: "Erro interno ao buscar Questions.",
        });
    }
}
//# sourceMappingURL=read-question.controller.js.map