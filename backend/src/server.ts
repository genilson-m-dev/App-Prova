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
import app from "./app"; // Importa a instância do Express configurada no arquivo App.ts

const PORT = process.env.PORT || 9999; // Define a porta do servidor, usando a variável de ambiente PORT ou 3000 como padrão

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});