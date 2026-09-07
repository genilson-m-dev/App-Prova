import { Router } from "express";
import { createQuestionController } from "../controllers/question/create-question.controller";

const questionRouter = Router();

questionRouter.post("/question", createQuestionController);




export default questionRouter;
