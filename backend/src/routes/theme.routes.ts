import {Router} from 'express';
import { prismaDB } from '../lib/prisma';

const themeRouter = Router();

themeRouter.get("/", async (_req, res) => {
    try {
        const themes = await prismaDB.theme.findMany();
        return res.status(200).json(themes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar themas" });
    }
})

export default themeRouter;