"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionById = getQuestionById;
const prisma_1 = require("../../lib/prisma");
async function getQuestionById(id) {
    if (typeof id !== "string") {
        throw new Error("O id deve ser uma string.");
    }
    const normalizedId = id.trim();
    if (!normalizedId) {
        throw new Error("O id é obrigatório.");
    }
    const question = await prisma_1.prismaDB.question.findUnique({
        where: {
            id: normalizedId,
        },
        include: {
            options: true,
            subject: true,
        },
    });
    if (!question) {
        throw new Error("Question não encontrada.");
    }
    return question;
}
//# sourceMappingURL=get-question-by-id.service.js.map