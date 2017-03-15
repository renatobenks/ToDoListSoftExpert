import { state, AphroditeStyles } from './../components.mock';

import { todos } from './../../state';
import { toggleTodoState } from './../../actions';

import { TodoItemComponent } from './TodoItem';

const event = {
    target: {
        matches: selector => true,
        getAttribute: attribute => '1'
    },
    stopPropagation: () => true
};

describe('Component: TodoItemComponent', () => {
    test('should be imported', () => {
        expect(TodoItemComponent).toBeDefined();
    });

    test('should get methods of class', () => {
        expect(TodoItemComponent.renderToDoItem).toBeDefined();
        expect(typeof TodoItemComponent.renderToDoItem).toBe('function');
        expect(TodoItemComponent.toggleStatusTodoItem).toBeDefined();
        expect(typeof TodoItemComponent.toggleStatusTodoItem).toBe('function');
    });

    describe('toggleStatusTodoItem () =>', () => {
        test('should toggle status todo item', () => {
            const mockToggleTodoItem = jest.fn(toggleTodoState);
            spyOn(todos, 'dispatch');

            TodoItemComponent.toggleStatusTodoItem(event);
            expect(todos.dispatch).toHaveBeenCalledWith(mockToggleTodoItem(1));
            expect(mockToggleTodoItem).toHaveBeenCalledWith(1);
        });
    });

    describe('static renderToDoItem () =>', () => {
        beforeEach(() => {
            AphroditeStyles.before();
        });

        test('should return element', () => {
            expect(TodoItemComponent.renderToDoItem(state.todos[0])).toBeDefined();
            expect(typeof TodoItemComponent.renderToDoItem(state.todos[0])).toBe('string');
        });

        afterEach(() => {
            AphroditeStyles.after();
        });
    });
});