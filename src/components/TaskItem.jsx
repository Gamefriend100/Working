const TaskItem = ({ task }) => {
    return (
        <div className={`flex justify-between items-center px-3 py-2 ${task.completed ? 'bg-green-200' : 'bg-gray-200'}`}>
            <div>
                <p>{task.title}</p>
                <p>{task.desc}</p>
            </div>
            <p>{task.dueDate.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })}</p>
        </div>
    )
}

export default TaskItem;