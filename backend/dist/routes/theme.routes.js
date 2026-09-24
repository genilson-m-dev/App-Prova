"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_theme_controller_1 = require("../controllers/theme/create-theme.controller");
const read_theme_controller_1 = require("../controllers/theme/read-theme.controller");
const update_theme_controller_1 = require("../controllers/theme/update-theme.controller");
const delete_theme_controller_1 = require("../controllers/theme/delete-theme.controller");
const themeRouter = (0, express_1.Router)();
themeRouter.get("/theme", read_theme_controller_1.getThemesController);
themeRouter.post("/create/theme", create_theme_controller_1.createThemeController);
themeRouter.get("/theme/:id", read_theme_controller_1.getThemeByIdController);
themeRouter.put("/theme/:id", update_theme_controller_1.updateThemeController);
themeRouter.delete("/theme/:id", delete_theme_controller_1.deleteThemeController);
exports.default = themeRouter;
//# sourceMappingURL=theme.routes.js.map