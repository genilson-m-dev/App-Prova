import { Router } from "express";
import { createSubjectController } from '../controllers/subject/subject.controller';
import { getSubjectsController } from '../controllers/subject/subject.controller';
const subjectRouter = Router();

subjectRouter.post("/create/subject", createSubjectController);
subjectRouter.get("/subjects", getSubjectsController);

export default subjectRouter;
