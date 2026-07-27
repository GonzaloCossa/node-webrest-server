"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTodoDTO = void 0;
class CreateTodoDTO {
    text;
    constructor(text) {
        this.text = text;
    }
    static create(props) {
        const { text } = props;
        if (!text)
            return ['Text property is required', undefined];
        return [undefined, new CreateTodoDTO(text)];
    }
}
exports.CreateTodoDTO = CreateTodoDTO;
//# sourceMappingURL=create-todo.dto.js.map