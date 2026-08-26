// app.ts que  → configura a aplicação.

import express from "express";
import cors from "cors";
import helmet from "helmet";
import subjectRouter from "./routes/subject.routes";
import questionRouter from "./routes/questions.routes";
import themeRouter from "./routes/theme.routes";

const app = express(); // Cria uma instância do Express

app.use(helmet()); // Adiciona o middleware Helmet para segurança
app.use(cors()); // Adiciona o middleware CORS para permitir requisições de diferentes origens
app.use(express.json()); // Adiciona o middleware para parsear o corpo das requisições como JSON

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "UP",
    message: "A aplicação está funcionando corretamente."
   }); // Rota de verificação de saúde da aplicação
});

app.use("/", themeRouter); // Adiciona o roteador de temas à aplicação
app.use("/", subjectRouter); // Adiciona o roteador de assuntos à aplicação
app.use("/", questionRouter); // Adiciona o roteador de perguntas à aplicação

export default app; // Exporta a instância do Express para ser usada em outros arquivos
