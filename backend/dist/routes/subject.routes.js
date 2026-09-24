"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_subject_controller_1 = require("../controllers/subject/create-subject.controller");
const read_subject_controller_1 = require("../controllers/subject/read-subject.controller");
const get_subject_by_id_controller_1 = require("../controllers/subject/get-subject-by-id.controller");
// import { getSubjectByIdController } from "../controllers/subject/get-subject-by-id.controller";
const update_subject_controller_1 = require("../controllers/subject/update-subject.controller");
const delete_subject_controller_1 = require("../controllers/subject/delete-subject.controller");
const subjectRouter = (0, express_1.Router)();
subjectRouter.post("/subject", create_subject_controller_1.createSubjectController);
subjectRouter.get("/subjects", read_subject_controller_1.getSubjectsController);
subjectRouter.get("/subject/:id", get_subject_by_id_controller_1.getSubjectByIdController);
subjectRouter.get("/subject/:subjectId/questions", get_subject_by_id_controller_1.getSubjectByIdController);
subjectRouter.put("/subject/:id", update_subject_controller_1.updateSubjectController);
subjectRouter.delete("/subject/:id", delete_subject_controller_1.deleteSubjectController);
exports.default = subjectRouter;
//# sourceMappingURL=subject.routes.js.map