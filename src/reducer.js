import uuidv4 from 'uuid/v4'

export default function reducer(state, action) {
    switch(action.type) {
        case "ADD_TODO":
        if (!action.payload) {
            return state;
        }
        if (state.todos.findIndex(t => t.text === action.payload) > - 1) {
            return state;
        }
            const newTodo = {
                id: uuidv4(),
                text: action.payload,
                complete: false
            }
            const addedTodos = [...state.todos, newTodo]
            return {
                ...state,
                todos: addedTodos
            }
        case "SET_CURRENT_TODO":
            return {
                ...state,
                currectTodo: action.payload
            }
        case "TOGGLE_TODO":
            const toggledTodos = state.todos.map(t => 
                t.id === action.payload.id ? { ...action.payload, complete: !action.payload.complete } : t
            )
            return {
                ...state,
                todos: toggledTodos
            };
        case "UPDATE_TODO":
            if (!action.payload) {
                return state;
            }
            if (state.todos.findIndex(t => t.text === action.payload) > - 1) {
                return state;
            }
            const updateTodo = { ...state.currectTodo, text: action.payload }
            const updatedTodoIndex = state.todos.findIndex(
                t => t.id === state.currectTodo.id
            )
            const updatedTodos = [
                ...state.todos.slice(0, updatedTodoIndex),
                updateTodo,
                ...state.todos.slice(updatedTodoIndex + 1)
            ]
            return {
                ...state,
                currectTodo: {},
                todos: updatedTodos
            }
        case "REMOVE_TODO":
            const filteredTodos = state.todos.filter(t => t.id !== action.payload.id);
            const isRemovedTodo = state.currentTodo.id === action.payload ? {} :
            state.currectTodo;
            return {
                ...state,
                currectTodo: isRemovedTodo,
                todos: filteredTodos
            };
        
        default:
            return state;
    }
}