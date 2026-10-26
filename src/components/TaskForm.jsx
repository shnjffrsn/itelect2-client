import {useState} from "react";

function TaskForm({onAdd}){
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    
async function handleSubmit(e){
    e.preventDefault();
    const trimmed = title.trim();
    
    if (trimmed === "") return;
    
    try{
        await onAdd(trimmed);
        setTitle("");
        setError("");
    
    }catch (err){
        setError(err.message);
    }
}

return (
    <form className="task-form" onSubmit={handleSubmit}>
        <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title of a new task"
      />
      
      <button type="submit">Add task</button>
      
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TaskForm;