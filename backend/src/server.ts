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
console.log("Hello, world!");
import app from "./App"; // Importa a instância do Express configurada no arquivo App.ts

const PORT = process.env.PORT || 9999; // Define a porta do servidor, usando a variável de ambiente PORT ou 3000 como padrão

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});