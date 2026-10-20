import {useState} from "react";

function TaskForm({onAdd}){
    const [title, setTitle] = useState("");
    
    function handleSubmit(e){
        e.preventDefault();
        const trimmed = title.trim();
        if (trimmed === "") return;
        onAdd(trimmed);
        setTitle("");
    }
    
    return (
    <form className="task-form" onSubmit={handleSubmit}>
        <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title of a new task"
        />
        
        <button type="submit">Add task</button>    
    </form>
    );
}

export default TaskForm;