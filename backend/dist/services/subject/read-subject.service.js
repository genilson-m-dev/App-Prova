"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjects = getSubjects;
exports.getSubject = getSubject;
const prisma_1 = require("../../lib/prisma");
async function getSubjects() {
    const subjects = await prisma_1.prismaDB.subject.findMany({
        orderBy: {
            name: "asc",
        },
    });
    return subjects;
}
async function getSubject(id) {
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
    return subject;
}
//# sourceMappingURL=read-subject.service.js.map