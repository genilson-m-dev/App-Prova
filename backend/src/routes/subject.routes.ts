import { Router } from "express";

import { createSubjectController } from "../controllers/subject/create-subject.controller";
import {getSubjectsController} from "../controllers/subject/read-subject.controller";
const subjectRouter = Router();

subjectRouter.post("/create/subject", createSubjectController);
subjectRouter.get("/read/subjects", getSubjectsController);


export default subjectRouter;