import {listen} from './lib/events';

import { InputToDoItemComponent } from './components/Input/Input';
import { TodoItemComponent } from './components/Todo/TodoItem';
import { FilterComponent } from './components/Filter/Filter';
import SeverityComponent from './components/Severity/Severity';

export const registerEventHandlers = () => {
    listen('click', '#addTodo', InputToDoItemComponent.addTodoItem);
    listen('keydown', '#todoInput', InputToDoItemComponent.addTodoItemWithEnter);
    listen('click', '.js_toggle_todo', TodoItemComponent.toggleStatusTodoItem);
    listen('change', '#filter label input[type="radio"]', FilterComponent.filterTodoList);
    listen('click', '#removeTodoItem', TodoItemComponent.removeTodoItem);
    listen('change', '#set-severity', (event) => {
        SeverityComponent.changeTodoSeverity(event);
    });
};
