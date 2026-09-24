"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestion = deleteQuestion;
const prisma_1 = require("../../lib/prisma");
async function deleteQuestion(id) {
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
    });
    if (!question) {
        throw new Error("Question não encontrada.");
    }
    await prisma_1.prismaDB.$transaction(async (tx) => {
        await tx.questionOption.deleteMany({
            where: {
                questionId: normalizedId,
            },
        });
        await tx.question.delete({
            where: {
                id: normalizedId,
            },
        });
    });
}
//# sourceMappingURL=detele-question.service.js.map