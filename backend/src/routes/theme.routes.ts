import { Router } from "express";

import {createThemeController} from "../controllers/theme/create-theme.controller";
import {
  getThemesController,
  getThemeByIdController,
} from "../controllers/theme/read-theme.controller";
import { updateThemeController } from "../controllers/theme/update-theme.controller";
import { deleteThemeController } from "../controllers/theme/delete-theme.controller";
const themeRouter = Router();

themeRouter.get("/theme", getThemesController);

themeRouter.post("/create/theme", createThemeController);

themeRouter.get("/theme/:id", getThemeByIdController);

themeRouter.put("/theme/:id", updateThemeController);

themeRouter.delete("/theme/:id", deleteThemeController);

export default themeRouter;