import { Router } from "express";

import {
  createQuestionController,
  getQuestionsController,
  getQuestionsBySubjectController,
} from "../controllers/question/question.controller";

const questionRouter = Router();

questionRouter.post("/create/question", createQuestionController);

questionRouter.get("/questions", getQuestionsController);

questionRouter.get(
  "/subject/:subjectId/questions",
  getQuestionsBySubjectController
);

export default questionRouter;
