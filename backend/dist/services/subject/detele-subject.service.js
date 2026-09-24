"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubject = deleteSubject;
const prisma_1 = require("../../lib/prisma");
async function deleteSubject(id) {
    if (typeof id !== "string") {
        throw new Error("O id do Subject deve ser uma string.");
    }
    const normalizedId = id.trim();
    if (!normalizedId) {
        throw new Error("O id do Subject é obrigatório.");
    }
    const subject = await prisma_1.prismaDB.subject.findUnique({
        where: {
            id: normalizedId,
        },
    });
    if (!subject) {
        throw new Error("Subject não encontrado.");
    }
    const questions = await prisma_1.prismaDB.question.count({
        where: {
            subjectId: normalizedId,
        },
    });
    if (questions > 0) {
        throw new Error("Não é possível excluir o Subject porque existem Questions vinculadas a ele.");
    }
    await prisma_1.prismaDB.subject.delete({
        where: {
            id: normalizedId,
        },
    });
    return subject;
}
//# sourceMappingURL=detele-subject.service.js.map