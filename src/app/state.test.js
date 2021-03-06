import { createStore } from './lib/state';

import { todoChangeHandler, store, getInitialState } from './state';

import { addTodo } from './components/Input/Input.actions';
import { toggleTodoState, removeTodoItem } from './components/Todo/TodoItem.actions';
import { filterTodoList, toggleFilter } from './components/Filter/Filter.actions';
import { toggleSeverity } from './components/Severity/Severity.actions';

import { state, fetch } from './components/components.mock';

//noinspection JSAnnotator
global.fetch = fetch;

describe('State: App', () => {
    test('should be imported reducer', () => {
        expect(todoChangeHandler).toBeDefined();
        expect(typeof todoChangeHandler).toBe('function');
    });

    test('should be created store', () => {
        getInitialState()
            .then(() => {
                expect(store).toBeDefined();
                expect(typeof store).toBe('object');
                expect(store.dispatch).toBeDefined();
                expect(store.subscribe).toBeDefined();
                expect(store.getState).toBeDefined();
            });
    });

    const mockReducer = jest.fn(todoChangeHandler);
    const mockCreateStore = jest.fn(createStore);

    let STORE = mockCreateStore(mockReducer, state);

    describe('createStore () =>', () => {
        test('should be created the store for control app state', () => {
            expect(STORE.dispatch).toBeDefined();
            expect(STORE.subscribe).toBeDefined();
            expect(STORE.getState).toBeDefined();
        });

        test('should use reducer for update store state', () => {
            return getInitialState()
                .then(() => {
                    STORE.dispatch(filterTodoList(null));
                    expect(mockReducer).toHaveBeenCalledWith(state, filterTodoList(null));
                });
        });
    });

    describe('todoChangeHandler () =>', () => {
        describe('change: FILTER_TODO', () => {
            test('should filter for all todo items', () => {
                expect(state.todos.length).toBe(4);
                return getInitialState()
                    .then(() => {
                        mockReducer(state, filterTodoList(false));
                        expect(state.todos.length).toBe(3);
                        mockReducer(state, filterTodoList(true));
                        expect(state.todos.length).toBe(1);
                        mockReducer(state, filterTodoList(null));
                        expect(state.todos.length).toBe(4);
                    });
            });
        });

        describe('change: ADD_TODO', () => {
            test('should add new todo to state todo list', () => {
                let todo = {
                    id: 4,
                    text: 'my task',
                    done: false,
                    severity: 'normal'
                };
                expect(state.todos.length).toBe(4);
                mockReducer(state, addTodo(todo));
                expect(state.todos.length).toBe(5);
                expect(state.todos[state.todos.length-1]).toEqual(todo);
            });
        });

        describe('change: TODO_TOGGLE_DONE', () => {
            test('should toggle done status todo item', () => {
                expect(state.todos[0].done).toBe(true);
                mockReducer(state, toggleTodoState(0));
                expect(state.todos[0].done).toBe(false);
                expect(state.todos[1].done).toBe(false);
                mockReducer(state, toggleTodoState(1));
                expect(state.todos[1].done).toBe(true);
            });
        });

        describe('change: REMOVE_TODO_ITEM', () => {
            test('should remove item from todo list items', () => {
                expect(state.todos.length).toBe(5);
                expect(state.todos[2].id).toBe(2);
                expect(state.todos[3].id).toBe(3);
                mockReducer(state, removeTodoItem(2));
                expect(state.todos.length).toBe(4);
                expect(state.todos[2].id).toBe(3);
            });
        });

        describe('change: TOGGLE_FILTER', () => {
            test('should update filter selected', () => {
                expect(state.filters[0].selected).toBe(true);
                mockReducer(state, toggleFilter(2));
                expect(state.filters[0].selected).toBe(false);
                expect(state.filters[1].selected).toBe(true);
            });
        });

        describe('change: TOGGLE_SEVERITY_TODO', () => {
            test('should toggle severity todo', () => {
                expect(state.severities[2].selected).toBe(true);
                mockReducer(state, toggleSeverity(2));
                expect(state.severities[2].selected).toBe(false);
                expect(state.filters[1].selected).toBe(true);
            });
        });
    });

    describe('async getInitialState () =>', () => {
        const mockGetInitialState = jest.fn(getInitialState);
        test('should try fetch data state from api', () => {
            try {
                mockGetInitialState()
                    .then((data) => {
                        expect(data).toEqual(state);
                    });
            } catch (e) {
                expect(e).toBe('Error on request fetching');
            }
        });

        test('should response severities with description about selection', async () => {
            const severities_response = await mockGetInitialState()
                .then((data) => data.severities);
            for (let severity of severities_response) {
                expect(severity.selected).toBeDefined();
                if (severity.priority === 'normal') {
                    expect(severity.selected).toBe(true);
                } else {
                    expect(severity.selected).toBe(false);
                }
            }

        });

        test('should create store from data state fetched from api', () => {
            return mockGetInitialState()
                .then(() => {
                    expect(mockCreateStore).toHaveBeenCalledWith(mockReducer, state);
                });
        });

        test('should handler error and throw him when catch fetch', () => {
            spyOn(console, 'error');
            const mockGetInitialState = jest.fn(async () => {
                try {
                    return await fetch('/api/v1/data');
                } catch (e) {
                    throw e;
                }
            });

            return mockGetInitialState()
                .catch(() => {
                    expect(mockGetInitialState()).toThrow();
                });
        });
    });
});
