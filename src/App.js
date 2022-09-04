import { useState, useEffect } from "react";
import Todo from "./Components/Todo";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, deleteTodo } from "./Redux/Action";
import { saveTodos } from "./Helpers/LocalStorageOperations";

// const loadTodo = () => {
//   let todos = JSON.parse(localStorage.getItem("todoList"));
//   if (todos) {
//     return todos;
//   } else {
//     return [];
//   }
// };

const App = () => {
  const [todo, setTodo] = useState("");
  // const [todos, setTodos] = useState(loadTodo());
  const [edit, setEdit] = useState(false);
  const [todoIndex, setTodoIndex] = useState("");

  const TODOS = useSelector((state) => state);
  const DISPATCH = useDispatch();

  useEffect(() => {
    saveTodos(TODOS);
  }, [TODOS]);

  const addNewTodo = () => {
    DISPATCH(
      addTodo({
        id: Date.now(),
        todoName: todo,
        dateTime: new Date().toLocaleString(),
      })
    );
    clearAll();
  };

  const deleteSelectedTodo = (todoId) => {
    DISPATCH(deleteTodo(todoId));
    clearAll();
  };

  const updateSelectedTodo = () => {
    DISPATCH(updateTodo(todo, todoIndex));
    clearAll();
  };

  const editSelectedTodo = (todoId) => {
    TODOS.forEach((todo, index) => {
      if (todo.id === todoId) {
        setEdit(true);
        setTodo(todo.todoName);
        setTodoIndex(index);
      }
    });
  };

  const clearAll = () => {
    setTodo("");
    setTodoIndex("");
    setEdit(false);
  };

  return (
    <>
      <h1>Todo App</h1>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={edit ? updateSelectedTodo : addNewTodo}>
        {edit ? "Update" : "Add"}
      </button>
      <button onClick={clearAll}>Clear</button>
      <br />
      <br />
      {TODOS?.map((todo, index) => {
        const { id, todoName, dateTime } = todo;
        return (
          <Todo
            key={index}
            id={id}
            todoName={todoName}
            dateTime={dateTime}
            editFunc={editSelectedTodo}
            deleteFunc={deleteSelectedTodo}
          />
        );
      })}
    </>
  );
};

export default App;
