"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubjectController = deleteSubjectController;
const detele_subject_service_1 = require("../../services/subject/detele-subject.service");
async function deleteSubjectController(req, res) {
    try {
        const { id } = req.params;
        const subject = await (0, detele_subject_service_1.deleteSubject)(id);
        return res.status(200).json({
            message: "Subject excluído com sucesso.",
            data: subject,
        });
    }
    catch (error) {
        console.error("Erro ao excluir Subject:", error);
        if (!(error instanceof Error)) {
            return res.status(500).json({
                error: "Erro interno ao excluir Subject.",
            });
        }
        if (error.message === "O id do Subject deve ser uma string." ||
            error.message === "O id do Subject é obrigatório.") {
            return res.status(400).json({
                error: error.message,
            });
        }
        if (error.message === "Subject não encontrado.") {
            return res.status(404).json({
                error: error.message,
            });
        }
        if (error.message ===
            "Não é possível excluir o Subject porque existem Questions vinculadas a ele.") {
            return res.status(409).json({
                error: error.message,
            });
        }
        return res.status(500).json({
            error: "Erro interno ao excluir Subject.",
        });
    }
}
//# sourceMappingURL=delete-subject.controller.js.map