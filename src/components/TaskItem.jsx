  
const TaskItem = ({ task, onEdit, onDelete, onCheck }) => {
  // 📅 Fecha actual (solo día, sin hora)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ❌ Tarea vencida: fecha menor a hoy y NO completada
  const isExpired =
    new Date(task.dueDate).setHours(0, 0, 0, 0) < today &&
    !task.completed;
  
  return ( 
    <div
      className={`flex justify-between items-center p-4 rounded-md shadow-md mb-2 transition-colors
        ${
          task.completed
            ? "bg-green-200 text-green-800"
            : isExpired
            ? "bg-red-200 text-red-800"
            : "bg-white text-gray-900"
        }`}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onCheck(task.id)}
          className="w-5 h-5 cursor-pointer"
        />
  
        <div className="flex flex-col">
          <p className="font-medium text-lg">{task.title}</p>
          <p className="text-sm">{task.desc}</p>

          {/* Texto opcional de vencida */}
          {isExpired && (
            <span className="text-xs font-semibold">
              ⚠️ Tarea vencida
            </span>
          )}
        </div>
      </div>
          
          // Botones de acción
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
