import { Router } from "express";

import { createSubjectController } from "../controllers/subject/create-subject.controller";
import {} from "../controllers/subject/read-subject.controller";
const subjectRouter = Router();

subjectRouter.post("/subject", createSubjectController);

export default subjectRouter;