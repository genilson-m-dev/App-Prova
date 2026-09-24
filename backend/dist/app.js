"use strict";
// app.ts que  → configura a aplicação.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const subject_routes_1 = __importDefault(require("./routes/subject.routes"));
const questions_routes_1 = __importDefault(require("./routes/questions.routes"));
const theme_routes_1 = __importDefault(require("./routes/theme.routes"));
const app = (0, express_1.default)(); // Cria uma instância do Express
app.use((0, helmet_1.default)()); // Adiciona o middleware Helmet para segurança
app.use((0, cors_1.default)()); // Adiciona o middleware CORS para permitir requisições de diferentes origens
app.use(express_1.default.json()); // Adiciona o middleware para parsear o corpo das requisições como JSON
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "UP",
        message: "A aplicação está funcionando corretamente."
    }); // Rota de verificação de saúde da aplicação
});
app.use("/", theme_routes_1.default); // Adiciona o roteador de temas à aplicação
app.use("/", subject_routes_1.default); // Adiciona o roteador de assuntos à aplicação
app.use("/", questions_routes_1.default); // Adiciona o roteador de perguntas à aplicação
exports.default = app; // Exporta a instância do Express para ser usada em outros arquivos
//# sourceMappingURL=app.js.map