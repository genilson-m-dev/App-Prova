import { prismaDB } from "../../lib/prisma";

type QuestionOptionInput = {
  text: unknown;
  isCorrect: unknown;
};

export async function createQuestion(
  statement: unknown,
  explanation: unknown,
  difficulty: unknown,
  type: unknown,
  bank: unknown,
  subjectId: unknown,
  options: unknown
) {
  // ==========================================
  // 1. Validação dos tipos básicos
  // ==========================================

  if (typeof statement !== "string") {
    throw new Error("O statement deve ser uma string.");
  }

  if (typeof explanation !== "string") {
    throw new Error("A explanation deve ser uma string.");
  }

  if (typeof difficulty !== "string") {
    throw new Error("A difficulty deve ser uma string.");
  }

  if (typeof type !== "string") {
    throw new Error("O type deve ser uma string.");
  }

  if (typeof bank !== "string") {
    throw new Error("O bank deve ser uma string.");
  }

  if (typeof subjectId !== "string") {
    throw new Error("O subjectId deve ser uma string.");
  }

  if (!Array.isArray(options)) {
    throw new Error("As options devem ser um array.");
  }

  // ==========================================
  // 2. Normalização
  // ==========================================

  const normalizedStatement = statement.trim();
  const normalizedExplanation = explanation.trim();
  const normalizedDifficulty = difficulty.trim().toUpperCase();
  const normalizedType = type.trim().toUpperCase();
  const normalizedBank = bank.trim().toUpperCase();
  const normalizedSubjectId = subjectId.trim();

  // ==========================================
  // 3. Campos obrigatórios
  // ==========================================

  if (!normalizedStatement) {
    throw new Error("O statement é obrigatório.");
  }

  if (!normalizedExplanation) {
    throw new Error("A explanation é obrigatória.");
  }

  if (!normalizedDifficulty) {
    throw new Error("A difficulty é obrigatória.");
  }

  if (!normalizedType) {
    throw new Error("O type é obrigatório.");
  }

  if (!normalizedBank) {
    throw new Error("O bank é obrigatório.");
  }

  if (!normalizedSubjectId) {
    throw new Error("O subjectId é obrigatório.");
  }

  // ==========================================
  // 4. Validação dos enums
  // ==========================================

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

  const validTypes = [
    "TRUE_FALSE",
    "MULTIPLE_CHOICE",
    "MULTIPLE_ANSWER",
  ];

  if (!validTypes.includes(normalizedType)) {
    throw new Error(
      "O type deve ser TRUE_FALSE, MULTIPLE_CHOICE ou MULTIPLE_ANSWER."
    );
  }

  const validBanks = [
    "CEBRASPE",
    "FCC",
    "CENSAGRARIO",
    "OTHER",
  ];

  if (!validBanks.includes(normalizedBank)) {
    throw new Error(
      "O bank deve ser CEBRASPE, FCC, CENSAGRARIO ou OTHER."
    );
  }

  // ==========================================
  // 5. Validação das options
  // ==========================================

  if (options.length === 0) {
    throw new Error(
      "A Question deve possuir pelo menos uma option."
    );
  }

  const normalizedOptions: {
    text: string;
    isCorrect: boolean;
  }[] = [];

  for (const option of options as QuestionOptionInput[]) {
    if (
      option === null ||
      typeof option !== "object"
    ) {
      throw new Error(
        "Cada option deve ser um objeto."
      );
    }

    if (typeof option.text !== "string") {
      throw new Error(
        "O texto de cada option deve ser uma string."
      );
    }

    if (typeof option.isCorrect !== "boolean") {
      throw new Error(
        "O isCorrect de cada option deve ser boolean."
      );
    }

    const normalizedText = option.text.trim();

    if (!normalizedText) {
      throw new Error(
        "O texto da option é obrigatório."
      );
    }

    normalizedOptions.push({
      text: normalizedText,
      isCorrect: option.isCorrect,
    });
  }

  // ==========================================
  // 6. Verificar options duplicadas
  // ==========================================

  const optionTexts = normalizedOptions.map((option) =>
    option.text.toLowerCase()
  );

  const uniqueOptionTexts = new Set(optionTexts);

  if (uniqueOptionTexts.size !== optionTexts.length) {
    throw new Error(
      "Não podem existir options duplicadas na Question."
    );
  }

  // ==========================================
  // 7. Quantidade de options corretas
  // ==========================================

  const correctOptions = normalizedOptions.filter(
    (option) => option.isCorrect
  );

  const incorrectOptions = normalizedOptions.filter(
    (option) => !option.isCorrect
  );

  const totalOptions = normalizedOptions.length;
  const totalCorrect = correctOptions.length;
  const totalIncorrect = incorrectOptions.length;

  // ==========================================
  // 8. Regras do TRUE_FALSE
  // ==========================================

  if (normalizedType === "TRUE_FALSE") {
    if (totalOptions !== 2) {
      throw new Error(
        "Uma Question TRUE_FALSE deve possuir exatamente 2 options."
      );
    }

    if (totalCorrect !== 1) {
      throw new Error(
        "Uma Question TRUE_FALSE deve possuir exatamente 1 option correta."
      );
    }

    if (totalIncorrect !== 1) {
      throw new Error(
        "Uma Question TRUE_FALSE deve possuir exatamente 1 option incorreta."
      );
    }
  }

  // ==========================================
  // 9. Regras do MULTIPLE_CHOICE
  // ==========================================

  if (normalizedType === "MULTIPLE_CHOICE") {
    if (totalOptions !== 5) {
      throw new Error(
        "Uma Question MULTIPLE_CHOICE deve possuir exatamente 5 options."
      );
    }

    if (totalCorrect !== 1) {
      throw new Error(
        "Uma Question MULTIPLE_CHOICE deve possuir exatamente 1 option correta."
      );
    }

    if (totalIncorrect !== 4) {
      throw new Error(
        "Uma Question MULTIPLE_CHOICE deve possuir exatamente 4 options incorretas."
      );
    }
  }

  // ==========================================
  // 10. Regras do MULTIPLE_ANSWER
  // ==========================================

  if (normalizedType === "MULTIPLE_ANSWER") {
    if (totalOptions < 2 || totalOptions > 5) {
      throw new Error(
        "Uma Question MULTIPLE_ANSWER deve possuir entre 2 e 5 options."
      );
    }

    if (totalCorrect < 2 || totalCorrect > 4) {
      throw new Error(
        "Uma Question MULTIPLE_ANSWER deve possuir entre 2 e 4 options corretas."
      );
    }

    if (totalIncorrect < 1) {
      throw new Error(
        "Uma Question MULTIPLE_ANSWER deve possuir pelo menos 1 option incorreta."
      );
    }
  }

  // ==========================================
  // 11. Regra específica do CEBRASPE
  // ==========================================

  if (normalizedBank === "CEBRASPE") {
    if (normalizedType !== "TRUE_FALSE") {
      throw new Error(
        "Questions do banco CEBRASPE devem utilizar o type TRUE_FALSE."
      );
    }

    const optionNames = normalizedOptions.map((option) =>
      option.text.trim().toLowerCase()
    );

    const hasCerto = optionNames.includes("certo");
    const hasErrado = optionNames.includes("errado");

    if (!hasCerto || !hasErrado) {
      throw new Error(
        "Uma Question CEBRASPE deve possuir as options Certo e Errado."
      );
    }
  }

  // ==========================================
  // 12. Verificar Subject
  // ==========================================

  const subject = await prismaDB.subject.findUnique({
    where: {
      id: normalizedSubjectId,
    },
  });

  if (!subject) {
    throw new Error("Subject não encontrado.");
  }

  // ==========================================
  // 13. Verificar statement duplicado
  // ==========================================

  const existingQuestion = await prismaDB.question.findUnique({
    where: {
      statement: normalizedStatement,
    },
  });

  if (existingQuestion) {
    throw new Error(
      "Já existe uma Question com esse statement."
    );
  }

  // ==========================================
  // 14. Criar Question + Options
  // ==========================================

  const question = await prismaDB.question.create({
    data: {
      statement: normalizedStatement,
      explanation: normalizedExplanation,
      difficulty:
        normalizedDifficulty as
          | "BEGINNER"
          | "MEDIUM"
          | "HARD",
      type:
        normalizedType as
          | "TRUE_FALSE"
          | "MULTIPLE_CHOICE"
          | "MULTIPLE_ANSWER",
      bank:
        normalizedBank as
          | "CEBRASPE"
          | "FCC"
          | "CENSAGRARIO"
          | "OTHER",
      subjectId: normalizedSubjectId,

      options: {
        create: normalizedOptions,
      },
    },

    include: {
      options: true,
    },
  });

  return question;
}