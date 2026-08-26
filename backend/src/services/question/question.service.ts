import { prismaDB } from "../../lib/prisma";

export async function createQuestion(
    statement: unknown,
    explanation: unknown,
    difficulty: unknown,
    subjectId: unknown
) {
    if (typeof statement !== "string") {
        throw new Error("O statement deve ser uma string.");
    }

    if (typeof explanation !== "string") {
        throw new Error("A explanation deve ser uma string.");
    }

    if (typeof difficulty !== "string") {
        throw new Error("A difficulty deve ser uma string.");
    }

    if (typeof subjectId !== "string") {
        throw new Error("O subjectId deve ser uma string.");
    }

    const normalizedStatement = statement.trim();
    const normalizedExplanation = explanation.trim();
    const normalizedDifficulty = difficulty.trim().toUpperCase();
    const normalizedSubjectId = subjectId.trim();

    if (!normalizedStatement) {
        throw new Error("O statement é obrigatório.");
    }

    if (!normalizedExplanation) {
        throw new Error("A explanation é obrigatória.");
    }

    if (!normalizedSubjectId) {
        throw new Error("O subjectId é obrigatório.");
    }

    const validDifficulties = [
        "BEGINNER",
        "MEDIUM",
        "HARD",
    ];

    if (!validDifficulties.includes(normalizedDifficulty)) {
        throw new Error(
            "A difficulty deve ser BEGINNER, MEDIUM ou HARD."
        );
    }

    const subject = await prismaDB.subject.findUnique({
        where: {
            id: normalizedSubjectId,
        },
    });

    if (!subject) {
        throw new Error("Subject não encontrado.");
    }

    const existingQuestion = await prismaDB.question.findUnique({
        where: {
            statement: normalizedStatement,
        },
    });

    if (existingQuestion) {
        throw new Error(
            "Já existe uma questão com esse statement."
        );
    }

    const question = await prismaDB.question.create({
        data: {
            statement: normalizedStatement,
            explanation: normalizedExplanation,
            difficulty:
                normalizedDifficulty as "BEGINNER" | "MEDIUM" | "HARD",
            subjectId: normalizedSubjectId,
        },
    });

    return question;
}

export async function getQuestions() {
    const questions = await prismaDB.question.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return questions;
}

export async function getQuestionsBySubject(
    subjectId: unknown
) {
    if (typeof subjectId !== "string") {
        throw new Error("O subjectId deve ser uma string.");
    }

    const normalizedSubjectId = subjectId.trim();

    if (!normalizedSubjectId) {
        throw new Error("O subjectId é obrigatório.");
    }

    const subject = await prismaDB.subject.findUnique({
        where: {
            id: normalizedSubjectId,
        },
    });

    if (!subject) {
        throw new Error("Subject não encontrado.");
    }

    const questions = await prismaDB.question.findMany({
        where: {
            subjectId: normalizedSubjectId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return questions;
}