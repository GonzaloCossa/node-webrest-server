"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoDTO = void 0;
class UpdateTodoDTO {
    id;
    text;
    completedAt;
    constructor(id, text, completedAt) {
        this.id = id;
        this.text = text;
        this.completedAt = completedAt;
    }
    get values() {
        const returnObj = {};
        if (this.text)
            returnObj.text = this.text;
        if (this.completedAt)
            returnObj.completedAt = this.completedAt;
        return returnObj;
    }
    static create(props) {
        const { id, text, completedAt } = props;
        let newCompletedAt = completedAt;
        if (!id || isNaN(Number(id))) {
            return ['id must be a valid number'];
        }
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (newCompletedAt.toString() === 'Invalid Date') {
                return ['completedAt must be a valid date'];
            }
            ;
        }
        ;
        return [undefined, new UpdateTodoDTO(id, text, newCompletedAt)];
    }
}
exports.UpdateTodoDTO = UpdateTodoDTO;
//# sourceMappingURL=update-todo.dto.js.map