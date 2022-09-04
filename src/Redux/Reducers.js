import todos from "./States";

export const todoReducer = (state = todos, action) => {
  if (action.type === "ADD") {
    
  } else if (action.type === "UPDATE") {
  } else if (action.type === "DELETE") {
  } else {
    return state;
  }
};
