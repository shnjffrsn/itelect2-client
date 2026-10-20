import {useState} from "react";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import "./App.css";

const STARTING_TASKS = [
  {id: 1, title: "Be stiff", dueDate: "2026-10-21"},
  {id: 2, title: "Sew clothes", dueDate: "2026-10-22"},
  {id: 3, title: "Ring someone", dueDate: "2026-10-23"},
];

function App(){
  const [tasks, setTasks] = useState(STARTING_TASKS);

  function addTask(title){
    const newTask = {
      id: Date.now(),
      title: title,
      dueDate: new Date().toISOString().slice(0, 10),
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <main className="tasks">
      <h1>Task Manager</h1>
      <p>{tasks.length} tasks</p>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} />
    </main>
  );
}

export default App;