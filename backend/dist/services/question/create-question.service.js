"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionBatchValidationError = void 0;
exports.createQuestion = createQuestion;
exports.validateAndNormalizeQuestionBatch = validateAndNormalizeQuestionBatch;
/**
 * Erro específico de validação do lote
 */
class QuestionBatchValidationError extends Error {
    details;
    constructor(details) {
        super("Erro de validação no lote.");
        this.name =
            "QuestionBatchValidationError";
        this.details = details;
    }
}
exports.QuestionBatchValidationError = QuestionBatchValidationError;
/**
 * Função principal do CREATE.
 *
 * Neste momento ela executa somente a Fase 1:
 *
 * 1. validação local
 * 2. normalização
 *
 * Ainda não consulta o banco.
 * Ainda não cria registros.
 *
 * Isso será implementado nas próximas fases.
 */
async function createQuestion(input) {
    const normalizedQuestions = validateAndNormalizeQuestionBatch(input);
    return normalizedQuestions;
}
/**
 * FASE 1
 *
 * Valida e normaliza o lote inteiro.
 */
function validateAndNormalizeQuestionBatch(input) {
    const errors = [];
    /**
     * Validação do body
     */
    if (input === null ||
        typeof input !== "object" ||
        Array.isArray(input)) {
        throw new QuestionBatchValidationError([
            {
                field: "body",
                message: "O body da requisição deve ser um objeto.",
            },
        ]);
    }
    const body = input;
    /**
     * Validação do campo questions
     */
    if (!Array.isArray(body.questions)) {
        throw new QuestionBatchValidationError([
            {
                field: "questions",
                message: "O campo questions deve ser um array.",
            },
        ]);
    }
    const questions = body.questions;
    /**
     * Quantidade mínima
     */
    if (questions.length === 0) {
        throw new QuestionBatchValidationError([
            {
                field: "questions",
                message: "O lote deve possuir pelo menos 1 Question.",
            },
        ]);
    }
    /**
     * Quantidade máxima
     */
    if (questions.length > 100) {
        throw new QuestionBatchValidationError([
            {
                field: "questions",
                message: "O lote não pode possuir mais de 100 Questions.",
            },
        ]);
    }
    /**
     * Questions que conseguiram ser
     * normalizadas.
     *
     * Mantemos o índice original.
     */
    const normalizedQuestions = [];
    /**
     * Valida cada Question individualmente.
     */
    for (let index = 0; index < questions.length; index++) {
        const normalizedQuestion = validateAndNormalizeQuestion(questions[index], index, errors);
        if (normalizedQuestion) {
            normalizedQuestions.push({
                index,
                question: normalizedQuestion,
            });
        }
    }
    /**
     * Verifica statements duplicados
     * dentro do próprio lote.
     */
    validateDuplicateStatements(normalizedQuestions, errors);
    /**
     * Se houver qualquer erro,
     * nenhuma Question será criada.
     */
    if (errors.length > 0) {
        throw new QuestionBatchValidationError(errors);
    }
    /**
     * Retorna somente as Questions
     * normalizadas.
     */
    return normalizedQuestions.map((item) => item.question);
}
/**
 * Valida e normaliza uma Question.
 */
function validateAndNormalizeQuestion(input, index, errors) {
    /**
     * A Question precisa ser um objeto.
     */
    if (input === null ||
        typeof input !== "object" ||
        Array.isArray(input)) {
        errors.push({
            index,
            field: "question",
            message: "Cada item de questions deve ser um objeto.",
        });
        return null;
    }
    const question = input;
    const statement = question.statement;
    const explanation = question.explanation;
    const difficulty = question.difficulty;
    const type = question.type;
    const bank = question.bank;
    const subjectId = question.subjectId;
    const options = question.options;
    /**
     * =========================================
     * 1. VALIDAÇÃO ESTRUTURAL
     * =========================================
     */
    let hasStructuralError = false;
    /**
     * statement
     */
    if (typeof statement !== "string") {
        errors.push({
            index,
            field: "statement",
            message: "O statement deve ser uma string.",
        });
        hasStructuralError = true;
    }
    /**
     * explanation
     */
    if (typeof explanation !== "string") {
        errors.push({
            index,
            field: "explanation",
            message: "A explanation deve ser uma string.",
        });
        hasStructuralError = true;
    }
    /**
     * difficulty
     */
    if (typeof difficulty !== "string") {
        errors.push({
            index,
            field: "difficulty",
            message: "A difficulty deve ser uma string.",
        });
        hasStructuralError = true;
    }
    /**
     * type
     */
    if (typeof type !== "string") {
        errors.push({
            index,
            field: "type",
            message: "O type deve ser uma string.",
        });
        hasStructuralError = true;
    }
    /**
     * bank
     */
    if (typeof bank !== "string") {
        errors.push({
            index,
            field: "bank",
            message: "O bank deve ser uma string.",
        });
        hasStructuralError = true;
    }
    /**
     * subjectId
     */
    if (typeof subjectId !== "string") {
        errors.push({
            index,
            field: "subjectId",
            message: "O subjectId deve ser uma string.",
        });
        hasStructuralError = true;
    }
    /**
     * options
     */
    if (!Array.isArray(options)) {
        errors.push({
            index,
            field: "options",
            message: "As options devem ser um array.",
        });
        hasStructuralError = true;
    }
    /**
     * Se houver erro estrutural,
     * não continuamos nessa Question.
     */
    if (hasStructuralError) {
        return null;
    }
    /**
     * Depois das validações acima,
     * podemos informar ao TypeScript
     * os tipos corretos.
     */
    const statementValue = statement;
    const explanationValue = explanation;
    const difficultyValue = difficulty;
    const typeValue = type;
    const bankValue = bank;
    const subjectIdValue = subjectId;
    const optionsValue = options;
    /**
     * =========================================
     * 2. NORMALIZAÇÃO
     * =========================================
     */
    const normalizedStatement = statementValue.trim();
    const normalizedExplanation = explanationValue.trim();
    const normalizedDifficulty = difficultyValue
        .trim()
        .toUpperCase();
    const normalizedType = typeValue
        .trim()
        .toUpperCase();
    const normalizedBank = bankValue
        .trim()
        .toUpperCase();
    const normalizedSubjectId = subjectIdValue.trim();
    /**
     * =========================================
     * 3. CAMPOS OBRIGATÓRIOS
     * =========================================
     */
    let hasRequiredError = false;
    if (!normalizedStatement) {
        errors.push({
            index,
            field: "statement",
            message: "O statement é obrigatório.",
        });
        hasRequiredError = true;
    }
    if (!normalizedExplanation) {
        errors.push({
            index,
            field: "explanation",
            message: "A explanation é obrigatória.",
        });
        hasRequiredError = true;
    }
    if (!normalizedDifficulty) {
        errors.push({
            index,
            field: "difficulty",
            message: "A difficulty é obrigatória.",
        });
        hasRequiredError = true;
    }
    if (!normalizedType) {
        errors.push({
            index,
            field: "type",
            message: "O type é obrigatório.",
        });
        hasRequiredError = true;
    }
    if (!normalizedBank) {
        errors.push({
            index,
            field: "bank",
            message: "O bank é obrigatório.",
        });
        hasRequiredError = true;
    }
    if (!normalizedSubjectId) {
        errors.push({
            index,
            field: "subjectId",
            message: "O subjectId é obrigatório.",
        });
        hasRequiredError = true;
    }
    /**
     * Se houver campo obrigatório
     * faltando, não continuamos.
     */
    if (hasRequiredError) {
        return null;
    }
    /**
     * =========================================
     * 4. ENUMS
     * =========================================
     */
    const normalizedDifficultyValue = validateDifficulty(normalizedDifficulty, index, errors);
    const normalizedTypeValue = validateQuestionType(normalizedType, index, errors);
    const normalizedBankValue = validateQuestionBank(normalizedBank, index, errors);
    /**
     * Se algum enum for inválido,
     * não continuamos.
     */
    if (!normalizedDifficultyValue ||
        !normalizedTypeValue ||
        !normalizedBankValue) {
        return null;
    }
    /**
     * =========================================
     * 5. OPTIONS
     * =========================================
     */
    const normalizedOptions = validateAndNormalizeOptions(optionsValue, index, errors);
    /**
     * Se alguma option possuir
     * erro estrutural, não continuamos.
     */
    if (!normalizedOptions) {
        return null;
    }
    /**
     * =========================================
     * 6. REGRAS DO QUESTION TYPE
     * =========================================
     */
    const errorsBeforeRules = errors.length;
    validateQuestionTypeRules(normalizedTypeValue, normalizedOptions, index, errors);
    /**
     * =========================================
     * 7. REGRAS DO QUESTION BANK
     * =========================================
     */
    validateQuestionBankRules(normalizedBankValue, normalizedTypeValue, normalizedOptions, index, errors);
    /**
     * Verifica se as regras acima
     * adicionaram algum erro.
     */
    if (errors.length >
        errorsBeforeRules) {
        return null;
    }
    /**
     * =========================================
     * QUESTION NORMALIZADA
     * =========================================
     */
    return {
        statement: normalizedStatement,
        explanation: normalizedExplanation,
        difficulty: normalizedDifficultyValue,
        type: normalizedTypeValue,
        bank: normalizedBankValue,
        subjectId: normalizedSubjectId,
        options: normalizedOptions,
    };
}
/**
 * Valida Difficulty.
 */
function validateDifficulty(value, index, errors) {
    const validValues = [
        "BEGINNER",
        "MEDIUM",
        "HARD",
    ];
    if (!validValues.includes(value)) {
        errors.push({
            index,
            field: "difficulty",
            message: "A difficulty deve ser BEGINNER, MEDIUM ou HARD.",
        });
        return null;
    }
    return value;
}
/**
 * Valida QuestionType.
 */
function validateQuestionType(value, index, errors) {
    const validValues = [
        "TRUE_FALSE",
        "MULTIPLE_CHOICE",
        "MULTIPLE_ANSWER",
    ];
    if (!validValues.includes(value)) {
        errors.push({
            index,
            field: "type",
            message: "O type deve ser TRUE_FALSE, MULTIPLE_CHOICE ou MULTIPLE_ANSWER.",
        });
        return null;
    }
    return value;
}
/**
 * Valida QuestionBank.
 */
function validateQuestionBank(value, index, errors) {
    const validValues = [
        "CEBRASPE",
        "FCC",
        "CENSAGRARIO",
        "OTHER",
    ];
    if (!validValues.includes(value)) {
        errors.push({
            index,
            field: "bank",
            message: "O bank deve ser CEBRASPE, FCC, CENSAGRARIO ou OTHER.",
        });
        return null;
    }
    return value;
}
/**
 * Valida e normaliza Options.
 */
function validateAndNormalizeOptions(input, questionIndex, errors) {
    const normalizedOptions = [];
    /**
     * Percorre todas as options.
     */
    for (let optionIndex = 0; optionIndex < input.length; optionIndex++) {
        const option = input[optionIndex];
        /**
         * Option precisa ser objeto.
         */
        if (option === null ||
            typeof option !== "object" ||
            Array.isArray(option)) {
            errors.push({
                index: questionIndex,
                field: "options",
                optionIndex,
                message: "Cada option deve ser um objeto.",
            });
            continue;
        }
        const optionObject = option;
        /**
         * text
         */
        if (typeof optionObject.text !==
            "string") {
            errors.push({
                index: questionIndex,
                field: "options",
                optionIndex,
                message: "O texto de cada option deve ser uma string.",
            });
            continue;
        }
        /**
         * isCorrect
         */
        if (typeof optionObject.isCorrect !==
            "boolean") {
            errors.push({
                index: questionIndex,
                field: "options",
                optionIndex,
                message: "O isCorrect de cada option deve ser boolean.",
            });
            continue;
        }
        /**
         * Normaliza o texto.
         */
        const normalizedText = optionObject.text.trim();
        /**
         * Texto obrigatório.
         */
        if (!normalizedText) {
            errors.push({
                index: questionIndex,
                field: "options",
                optionIndex,
                message: "O texto da option é obrigatório.",
            });
            continue;
        }
        /**
         * Adiciona option normalizada.
         */
        normalizedOptions.push({
            text: normalizedText,
            isCorrect: optionObject.isCorrect,
        });
    }
    /**
     * Se alguma option apresentou
     * erro estrutural, não continuamos.
     */
    if (normalizedOptions.length !==
        input.length) {
        return null;
    }
    /**
     * Verifica duplicidade.
     */
    validateDuplicateOptions(normalizedOptions, questionIndex, errors);
    return normalizedOptions;
}
/**
 * Verifica options duplicadas
 * dentro da mesma Question.
 */
function validateDuplicateOptions(options, questionIndex, errors) {
    const seen = new Map();
    for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
        const normalizedText = options[optionIndex].text.toLowerCase();
        if (seen.has(normalizedText)) {
            errors.push({
                index: questionIndex,
                field: "options",
                optionIndex,
                message: "Não podem existir options duplicadas na Question.",
            });
            continue;
        }
        seen.set(normalizedText, optionIndex);
    }
}
/**
 * Regras de cada QuestionType.
 */
function validateQuestionTypeRules(type, options, index, errors) {
    const totalOptions = options.length;
    const totalCorrect = options.filter((option) => option.isCorrect).length;
    const totalIncorrect = totalOptions - totalCorrect;
    /**
     * TRUE_FALSE
     *
     * Exatamente:
     * 2 options
     * 1 correta
     * 1 incorreta
     */
    if (type === "TRUE_FALSE") {
        if (totalOptions !== 2) {
            errors.push({
                index,
                field: "options",
                message: "Uma Question TRUE_FALSE deve possuir exatamente 2 options.",
            });
        }
        if (totalCorrect !== 1) {
            errors.push({
                index,
                field: "options",
                message: "Uma Question TRUE_FALSE deve possuir exatamente 1 option correta.",
            });
        }
        if (totalIncorrect !== 1) {
            errors.push({
                index,
                field: "options",
                message: "Uma Question TRUE_FALSE deve possuir exatamente 1 option incorreta.",
            });
        }
    }
    /**
     * MULTIPLE_CHOICE
     *
     * Exatamente:
     * 5 options
     * 1 correta
     * 4 incorretas
     */
    if (type === "MULTIPLE_CHOICE") {
        if (totalOptions !== 5) {
            errors.push({
                index,
                field: "options",
                message: "Uma Question MULTIPLE_CHOICE deve possuir exatamente 5 options.",
            });
        }
        if (totalCorrect !== 1) {
            errors.push({
                index,
                field: "options",
                message: "Uma Question MULTIPLE_CHOICE deve possuir exatamente 1 option correta.",
            });
        }
        if (totalIncorrect !== 4) {
            errors.push({
                index,
                field: "options",
                message: "Uma Question MULTIPLE_CHOICE deve possuir exatamente 4 options incorretas.",
            });
        }
    }
    /**
     * MULTIPLE_ANSWER
     *
     * Entre:
     * 2 e 5 options
     * 2 e 4 corretas
     * pelo menos 1 incorreta
     */
    if (type === "MULTIPLE_ANSWER") {
        if (totalOptions < 2 ||
            totalOptions > 5) {
            errors.push({
                index,
                field: "options",
                message: "Uma Question MULTIPLE_ANSWER deve possuir entre 2 e 5 options.",
            });
        }
        if (totalCorrect < 2 ||
            totalCorrect > 4) {
            errors.push({
                index,
                field: "options",
                message: "Uma Question MULTIPLE_ANSWER deve possuir entre 2 e 4 options corretas.",
            });
        }
        if (totalIncorrect < 1) {
            errors.push({
                index,
                field: "options",
                message: "Uma Question MULTIPLE_ANSWER deve possuir pelo menos 1 option incorreta.",
            });
        }
    }
}
/**
 * Regras específicas do banco CEBRASPE.
 */
function validateQuestionBankRules(bank, type, options, index, errors) {
    /**
     * Os outros bancos não possuem
     * regra específica neste momento.
     */
    if (bank !== "CEBRASPE") {
        return;
    }
    /**
     * CEBRASPE precisa utilizar
     * TRUE_FALSE.
     */
    if (type !== "TRUE_FALSE") {
        errors.push({
            index,
            field: "type",
            message: "Questions do banco CEBRASPE devem utilizar o type TRUE_FALSE.",
        });
        return;
    }
    /**
     * CEBRASPE precisa possuir
     * Certo e Errado.
     */
    const optionNames = options.map((option) => option.text
        .trim()
        .toLowerCase());
    const hasCerto = optionNames.includes("certo");
    const hasErrado = optionNames.includes("errado");
    if (!hasCerto ||
        !hasErrado) {
        errors.push({
            index,
            field: "options",
            message: "Uma Question CEBRASPE deve possuir as options Certo e Errado.",
        });
    }
}
/**
 * Verifica statements duplicados
 * dentro do próprio lote.
 */
function validateDuplicateStatements(questions, errors) {
    const seen = new Map();
    for (const item of questions) {
        const normalizedStatement = item.question.statement
            .toLowerCase();
        if (seen.has(normalizedStatement)) {
            const previousIndex = seen.get(normalizedStatement);
            errors.push({
                index: item.index,
                field: "statement",
                message: `Já existe outro statement igual neste lote, no índice ${previousIndex}.`,
            });
            continue;
        }
        seen.set(normalizedStatement, item.index);
    }
}
//# sourceMappingURL=create-question.service.js.map