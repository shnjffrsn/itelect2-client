import {useEffect, useState} from "react";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

async function fetchTasks(){
  const res = await fetch(`${API_URL}/api/tasks`);
  if (!res.ok){
    throw new Error(`GET /api/tasks answered ${res.status}`);
  }
  return res.json();
}

function App(){
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [loggedInAs, setLoggedInAs] = useState("");
  
  useEffect(() => {
    async function loadTasks(){
      try{
        const data = await fetchTasks();
        setTasks(data);
      }catch (err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }
    loadTasks();
  }, []);
  
  async function logIn(email, password){
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
    
    const data = await res.json();
    if (!res.ok){
      throw new Error(data.error);
    }
    
    setToken(data.token);
    setLoggedInAs(email);
  }
  
  function logOut(){
    setToken("");
    setLoggedInAs("");
  }
  
  async function addTask(title){
    const res = await fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        dueDate: new Date().toISOString(),
        completed: false,
      }),
    });
    
    if (!res.ok){
      const data = await res.json();
      throw new Error(data.error);
    }

    const data = await fetchTasks();
    setTasks(data);
  }

  return (
  <main className="tasks">
    <h1>Task Manager</h1>
    
    {token ? (
      <p className="who">
        <span>Logged in as {loggedInAs}</span>
        <button onClick={logOut}>Log out</button>
        </p>
        ) : (
        <LoginForm onLogin={logIn} />
        )}
        
        {token && <TaskForm onAdd={addTask} />}
        
        {loading && <p>Loading tasks...</p>}
        {error && <p className="error">Could not load the tasks: {error}</p>}
        {!loading && !error && (
          
          <>
          <p>{tasks.length} tasks</p>
          <TaskList tasks={tasks} />
          </>
        )}
  </main>      
  );
}

export default App;