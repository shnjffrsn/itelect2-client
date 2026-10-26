function TaskList({tasks}){
    return (
    <ul className="task-list">
        {tasks.map((task) => (
            <li key={task.id}>
                <span>{task.title}</span>
                <span className="due">{task.dueDate ? task.dueDate.slice(0, 10) : ""}</span>
            </li>
        ))}
    </ul>
    );
}

export default TaskList;