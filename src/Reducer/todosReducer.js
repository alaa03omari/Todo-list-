export default function todosReducer(currentTodos, action) {
    switch (action.type) {
        case 'ADD_TODO': {
            const newTodo = {
                id: Date.now(),
                title: action.payload.newTitle,
                details: '',
                isCompleted: false
            };
            const updatedTodos = [...currentTodos, newTodo];
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case "DELETE_TODO": {
            const updatedTodos = currentTodos.filter(t => {
                return t.id !== action.payload.id;
            });
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case "EDIT_TODO": {
            const updatedTodos = currentTodos.map(t => {
                if (t.id === action.payload.id) {
                    return {
                        ...t,
                        title: action.payload.title,
                        details: action.payload.details
                    };
                } else {

                    return t;
                }
            });
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case 'GET_TODOS': {
            
            const storageTodos = JSON.parse(localStorage.getItem("todos")) || [];
            return storageTodos;
            
        }
        case "TOGGLE_BUTTON": {
            
            const updatedTodos = currentTodos.map(t => {
                if (t.id === action.payload.id) {
                    return { ...t, isCompleted: !t.isCompleted }
                }
                return t
            })
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        default: {
            throw Error('Unkown Error' + action.type);
        }
    }
    return []
}