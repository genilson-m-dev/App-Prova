import { Router } from "express";

import { createSubjectController } from "../controllers/subject/create-subject.controller";
import {getSubjectsController} from "../controllers/subject/read-subject.controller";
import { getSubjectByIdController } from "../controllers/subject/get-subject-by-id.controller";
import { updateSubjectController } from "../controllers/subject/update-subject.controller";
const subjectRouter = Router();

subjectRouter.post("/subject", createSubjectController);
subjectRouter.get("/subjects", getSubjectsController);
subjectRouter.get("/subject/:id", getSubjectByIdController);
subjectRouter.put("/subject/:id", updateSubjectController);


export default subjectRouter;