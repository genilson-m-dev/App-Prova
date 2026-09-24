"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestions = getQuestions;
const prisma_1 = require("../../lib/prisma");
async function getQuestions() {
    const questions = await prisma_1.prismaDB.question.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            options: true,
            subject: true,
        },
    });
    return questions;
}
//# sourceMappingURL=read-question.service.js.map