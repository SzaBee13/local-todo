import React, { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const trimmed = input.trim();
    if (trimmed) {
      setTasks([...tasks, trimmed]);
      setInput("");
    }
  };

  const removeTask = (idx) => {
    setTasks(tasks.filter((_, i) => i !== idx));
  };

  return (
    <div
      id="container"
      className="mx-auto p-4 bg-gray-800 flex flex-col items-center min-h-screen min-w-screen"
      style={{ maxWidth: 600 }}
    >
      <h1 className="text-3xl font-bold underline text-center my-4 text-white">
        To-Do List
      </h1>
      <div className="flex justify-center mb-4">
        <input
          id="taskInput"
          type="text"
          placeholder="Enter a new task"
          className="border p-2 mr-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white border-gray-600 min-w-60 max-w-full w-100"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button
          id="addTaskButton"
          className="bg-blue-500 text-white p-2 rounded w-20"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <div id="tasks" className="space-y-2">
        {tasks.map((task, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 bg-gray-700 border-b border-gray-600 rounded mb-2 min-w-fit max-w-full w-150"
          >
            <span className="text-white">{task}</span>
            <button
              className="bg-red-500 text-white p-1 rounded"
              onClick={() => removeTask(idx)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}