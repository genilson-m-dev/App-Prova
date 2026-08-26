import {Router} from 'express';
import { createSubjectController } from '../controllers/subject/subject.controller';
import { getThemes, createThemeController } from '../controllers/theme/theme.controller';
const themeRouter = Router();


themeRouter.get("/theme", getThemes);
themeRouter.post("/create/theme", createThemeController);
themeRouter.post("/create/subject", createSubjectController);

export default themeRouter;