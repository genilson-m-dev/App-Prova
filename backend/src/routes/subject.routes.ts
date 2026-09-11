import { Router } from "express";

import { createSubjectController } from "../controllers/subject/create-subject.controller";
import { getSubjectsController } from "../controllers/subject/read-subject.controller";
import { getSubjectByIdController } from "../controllers/subject/get-subject-by-id.controller";
// import { getSubjectByIdController } from "../controllers/subject/get-subject-by-id.controller";
import { updateSubjectController } from "../controllers/subject/update-subject.controller";
import { deleteSubjectController } from "../controllers/subject/delete-subject.controller";

const subjectRouter = Router();

subjectRouter.post("/subject", createSubjectController);

subjectRouter.get("/subjects", getSubjectsController);

subjectRouter.get("/subject/:id", getSubjectByIdController);

subjectRouter.get("/subject/:subjectId/questions", getSubjectByIdController);

subjectRouter.put("/subject/:id", updateSubjectController);

subjectRouter.delete("/subject/:id", deleteSubjectController);

export default subjectRouter;
