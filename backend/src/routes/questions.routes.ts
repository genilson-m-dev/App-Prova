import { Router } from "express";
import { createQuestionController } from "../controllers/question/create-question.controller";
import { getQuestionsController } from "../controllers/question/read-question.controller";
import { getQuestionByIdController } from "../controllers/question/get-question-by-id.controller";
import { updateQuestionController } from "../controllers/question/update-question.controller";


const questionRouter = Router();

questionRouter.post("/question", createQuestionController);
questionRouter.get("/questions", getQuestionsController);
questionRouter.get("/question/:id", getQuestionByIdController);
questionRouter.put("/question/:id", updateQuestionController);


export default questionRouter;
