import axios from "axios";
import React, { useState } from "react";

function Form() {
  const [input, setInput] = useState("");
  const addTodo = async (event) => {
    event.preventDefault();
    try {
      // Make a POST request to add a todo
      const response = await axios.post("/api/v1/todo", {
        task: input,
      });
      // Optionally, you can clear the input after a successful submission
      setInput("");
    } catch (error) {
      // Handle errors
      console.error("Error adding todo:", error);
    }
    
  };

  return (
    <div>
      <form action="" className="flex justify-center items-center min-h-[20vh]" onSubmit={addTodo}>
        <input
          type="text"
          className="p-[0.5rem] text-[2rem] border-none bg-white"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button
          className="text-[#d88771] bg-white cursor-pointer transition-all delay-[0.3] ease-in  hover:bg-[#d88771] hover:text-white p-[0.5rem] text-[2rem] border-none "
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-[3rem]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
        {/* <div class="m-4 relative overflow-hidden">
          <div class="relative bg-white">
            <select
              name="todos"
              id=""
              className="outline-none border-none text-[#ff6f47] w-40 cursor-pointer p-4 appearance-none bg-transparent transition-all duration-300 ease-in"
            >
              <option value="all">ALL</option>
              <option value="completed">COMPLETED</option>
              <option value="uncompleted">UNCOMPLETED</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 bg-[#ff6f47] transition-all duration-300 ease-in">
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div> */}
      </form>
    </div>
  );
}

export default Form;
