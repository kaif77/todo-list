import { loadTodos } from "../Helpers/LocalStorageOperations";

export const todoReducer = (state = loadTodos(), action) => {
  if (action.type === "ADD") {
    let newTodos = [...state];
    newTodos.push(action.payload);
    return newTodos;
  } else if (action.type === "UPDATE") {
    let newTodos = [...state];
    const { name, index } = action.payload;
    if (index !== -1) {
      newTodos[index] = {
        ...newTodos[index],
        todoName: name,
        dateTime: new Date().toLocaleString(),
      };
    }
    return newTodos;
  } else if (action.type === "DELETE") {
    let newTodos = [...state];
    newTodos = newTodos.filter((todos) => todos.id !== action.payload);
    return newTodos;
  } else {
    return state;
  }
};
