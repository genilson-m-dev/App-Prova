import { Router } from "express";
import { createSubjectController } from '../controllers/subject/subject.controller';
const subjectRouter = Router();

subjectRouter.post("/create/subject", createSubjectController);

export default subjectRouter;
