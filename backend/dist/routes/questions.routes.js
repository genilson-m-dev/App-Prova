"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_question_controller_1 = require("../controllers/question/create-question.controller");
const read_question_controller_1 = require("../controllers/question/read-question.controller");
const get_question_by_id_controller_1 = require("../controllers/question/get-question-by-id.controller");
const update_question_controller_1 = require("../controllers/question/update-question.controller");
const detele_question_controller_1 = require("../controllers/question/detele-question.controller");
const questionRouter = (0, express_1.Router)();
questionRouter.post("/question", create_question_controller_1.createQuestionController);
questionRouter.get("/questions", read_question_controller_1.getQuestionsController);
questionRouter.get("/question/:id", get_question_by_id_controller_1.getQuestionByIdController);
questionRouter.put("/question/:id", update_question_controller_1.updateQuestionController);
questionRouter.delete("/question/:id", detele_question_controller_1.deleteQuestionController);
exports.default = questionRouter;
//# sourceMappingURL=questions.routes.js.map