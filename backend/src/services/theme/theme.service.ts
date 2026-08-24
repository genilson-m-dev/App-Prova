import { prismaDB } from "../../lib/prisma"; // Conexão com o banco de dados
export async function getThemes(name: string){ // Função para criar um novo tema no banco de dados
    const theme = await prismaDB.theme.create({ // Cria um novo tema no banco de dados usando o Prisma
        data: { // Dados do novo tema
            name, // Nome do tema passado como parâmetro para a função
        }
    })
    return theme
}



