import {Router} from 'express';
import { getThemes, createThemeController } from '../controllers/theme/theme.controller';

const themeRouter = Router();

themeRouter.get("/theme", getThemes);
themeRouter.post("/create/theme", createThemeController);


export default themeRouter;