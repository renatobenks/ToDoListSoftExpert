import { css } from 'aphrodite';
import StylesInputToDoItemComponent from './Input.styles';

import { store } from './../../state';
import { addTodo } from './Input.actions';

import callAPIMiddleware from '../../middlewares/callAPImiddleware';
import SeverityComponent from '../Severity/Severity';

export class InputToDoItemComponent {
    static addTodoItem (event) {
        const todoInputValue = event.target.value;
        const severity = SeverityComponent.severity;
        if (todoInputValue) {
            callAPIMiddleware.FETCH_REQUEST('/todos', 'POST', {text: todoInputValue, severity: severity})
                .then(todo => {
                    if (todo.error) {
                        console.error(todo.error);
                        throw todo.error;
                    }

                    store.dispatch(addTodo(todo));
                    event.stopPropagation();
                    document.getElementById('todoInput').focus();
                });
        } else {
            event.target.classList.add(css(StylesInputToDoItemComponent.inputError));
            setTimeout(() => {
                event.target.classList.remove(StylesInputToDoItemComponent.inputError._name);
            }, 1000);
        }
    }

    static addTodoItemWithEnter (event) {
        if (event.key === 'Enter' && event.which === 13) {
            event.preventDefault();
            InputToDoItemComponent.addTodoItem(event);
        }
    }

    renderInput (SEVERITIES) {
        return `<div class="todo__input ${css(StylesInputToDoItemComponent.inputComponent)}">
            <button class="${css(StylesInputToDoItemComponent.inputButtonAddInputText)}" id="addTodo">
                <i class="add circle icon ${css(StylesInputToDoItemComponent.inputIconInButton)}"></i>
            </button>
            <input placeholder="Add a Task" class="${css(StylesInputToDoItemComponent.input)}" type="text" id="todoInput">
            <label class="${css(StylesInputToDoItemComponent.severity)} severity">
                ${SeverityComponent.render(SEVERITIES)}
            </label>
        </div>`;
    }
}

export default new InputToDoItemComponent
