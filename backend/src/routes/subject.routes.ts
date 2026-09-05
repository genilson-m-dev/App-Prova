import { Router } from "express";

import { createSubjectController } from "../controllers/subject/create-subject.controller";

const subjectRouter = Router();

subjectRouter.post("/subject", createSubjectController);

export default subjectRouter;