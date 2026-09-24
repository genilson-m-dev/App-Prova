"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectsController = getSubjectsController;
const read_subject_service_1 = require("../../services/subject/read-subject.service");
async function getSubjectsController(_req, res) {
    try {
        const subjects = await (0, read_subject_service_1.getSubjects)();
        return res.status(200).json({
            data: subjects,
        });
    }
    catch (error) {
        console.error("Erro ao buscar Subjects:", error);
        return res.status(500).json({
            error: "Erro interno ao buscar Subjects.",
        });
    }
}
//# sourceMappingURL=read-subject.controller.js.map