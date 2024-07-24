import React, { useState } from 'react';
import './SimpleTo-Do.css';
import { v4 as uuidv4 } from 'uuid';

function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  // Function to add a new task
  const addTask = (taskText) => {
    const newTask = { id: uuidv4(), title: taskText, completed: false };
    setTasks([...tasks, newTask]);
  };

  // Function to edit a specific task
  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title: newText } : task
    ));
  };

  // Function to delete a specific task
  const deleteTask = (id) => {
    const taskExists = tasks.find(task => task.id === id);
    if (taskExists) {
      setTasks(tasks.filter(task => task.id !== id));
    } else {
      console.error("Task not found");
    }
  };

  // Handler for adding a task
  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      addTask(taskInput);
      setTaskInput('');
    }
  };

  // Handler for editing a task
  const handleEditTask = (id) => {
    const task = tasks.find(task => task.id === id);
    const newText = prompt("Edit Task", task ? task.title : "");
    if (newText !== null && newText.trim() !== "" && task) {
      editTask(id, newText);
    }
  };

  // Handler for deleting a task
  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(id);
    }
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-section">
        <input
          type="text"
          id="new-task"
          placeholder="Add a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button id="add-task-button" onClick={handleAddTask}>
          Add
        </button>
      </div>
      <ul id="task-list">
        {tasks.map(task => (
          <li key={task.id} data-id={task.id}>
            <span>{task.title}</span>
            <button className="edit-btn" onClick={() => handleEditTask(task.id)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoApp;
