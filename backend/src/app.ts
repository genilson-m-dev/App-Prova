// app.ts que  → configura a aplicação.

import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express(); // Cria uma instância do Express

app.use(helmet()); // Adiciona o middleware Helmet para segurança
app.use(cors()); // Adiciona o middleware CORS para permitir requisições de diferentes origens
app.use(express.json()); // Adiciona o middleware para parsear o corpo das requisições como JSON

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "UP",
    message: "A aplicação está funcionando corretamente."
   }); // Rota de verificação de saúde da aplicação
});

export default app; // Exporta a instância do Express para ser usada em outros arquivos
