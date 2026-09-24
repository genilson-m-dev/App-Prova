"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts → inicia o servidor HTTP.
//server.ts
//  │
//   │ inicia
//   ▼
// app.ts
//   │
//   ├── Express
//   ├── Middlewares
//   ├── Rotas
//   └── Configurações
console.log("Hello, world!, I'm running the server.ts file!"); // Mensagem de log para indicar que o arquivo server.ts está sendo executado.
const app_1 = __importDefault(require("./app")); // Importa a instância do Express configurada no arquivo App.ts
const PORT = process.env.PORT || 3333; // Define a porta do servidor, usando a variável de ambiente PORT ou 3333 como padrão
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map