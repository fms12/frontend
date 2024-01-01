import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useSearchParams } from "react-router-dom";
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState("");
  const [searchParams] = useSearchParams();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchQuery = searchParams.get("q");

  const getTodo = async () => {
    try {
      const response = await axios.get(
        "https://backend-prod-4bbz.onrender.com/api/v1/todos"
      );
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  console.log(process.env.URL);
  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `https://backend-prod-4bbz.onrender.com/api/v1/todo/${id}`
      );
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const startEditing = (id, text) => {
    setEditingTodoId(id);
    setEditedTodoText(text);
  };

  const cancelEditing = () => {
    setEditingTodoId(null);
    setEditedTodoText("");
  };

  const saveEditing = async (id) => {
    try {
      // Send a request to update the todo on the server
      const response = await axios.put(
        `https://backend-prod-4bbz.onrender.com/api/v1/todo/${id}`,
        {
          task: editedTodoText,
        }
      );

      // Update the local state with the edited todo
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, task: response.data.task } : todo
        )
      );

      // Reset editing state
      setEditingTodoId(null);
      setEditedTodoText("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };


    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `https://backend-prod-4bbz.onrender.com/api/v1/search?q=${searchQuery}`
        );
        setTodos(response.data.data);
        setIsSearchActive(true);
      } catch (error) {
        console.error("Error searching todos:", error);
      }
    };

  useEffect(() => {
    setTimeout(() => {
          if (searchQuery) {
            handleSearch();
          } else {
            getTodo();
          }

    }, 5000);


    // Save the timeout ID for later use
    // Cleanup function to clear the timeout when the component unmounts or the dependency changes
    // return () => clearTimeout(timeout);
  },[searchQuery,todos]);

  return (
    <div className="flex justify-center items-center flex-col">
      <ul className="min-w-[37%] list-none">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="m-[0.5rem] bg-white text-black text-[1.5rem] flex justify-between items-center transition-all delay-0 ease-in"
          >
            {editingTodoId === todo.id ? (
              <input
                type="text"
                value={editedTodoText}
                onChange={(e) => setEditedTodoText(e.target.value)}
                className="flex-1 p-4"
              />
            ) : (
              <li className="flex-1 p-4 text-black ">{todo.task}</li>
            )}

            {editingTodoId === todo.id ? (
              <div>
                <button
                  className="bg-[#07ff1c] text-white border-none p-2 cursor-pointer text-[1rem] m-1"
                  onClick={() => saveEditing(todo.id)}
                >
                  <DoneOutlineIcon />
                </button>
                <button
                  className="bg-[#ff6f47] text-white border-none p-2 cursor-pointer text-[1rem] m-1"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
              
                <button
                  className="bg-[#000000] text-white border-none p-2 cursor-pointer text-[1rem] m-1"
                  onClick={() => startEditing(todo.id, todo.task)}
                >
                  <EditNoteIcon />
                </button>
                <button
                  className="bg-[#ff0707] text-white border-none p-2 cursor-pointer text-[1rem] m-1"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
