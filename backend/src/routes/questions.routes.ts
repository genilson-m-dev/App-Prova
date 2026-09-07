import { Router } from "express";
import { createQuestionController } from "../controllers/question/create-question.controller";
import { getQuestionsController } from "../controllers/question/read-question.controller";
const questionRouter = Router();

questionRouter.post("/question", createQuestionController);
questionRouter.get("/questions", getQuestionsController);



export default questionRouter;
