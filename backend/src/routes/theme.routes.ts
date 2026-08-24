import {Router} from 'express';
import { getThemes } from '../controllers/theme/theme.controller';

const themeRouter = Router();


themeRouter.get("/theme", getThemes);

export default themeRouter;