const TaskEdit = ({ isOpen, onClose, tasks, onEdit, onDelete }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl overflow-hidden">

              
                <div className="bg-emerald-700 px-5 py-3 flex justify-between items-center">
                    <h2 className="text-white text-lg font-semibold">
                        Editar tareas
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white text-xl"
                    >
                        ✕
                    </button>
                </div>

             
                <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">

                    {tasks.length === 0 && (
                        <p className="text-center text-gray-500">
                            No hay tareas registradas
                        </p>
                    )}

                    {tasks.map(task => (
                        <div
                            key={task.id}
                            className="flex justify-between items-center border rounded-md p-3"
                        >
                            <div>
                                <p className="font-medium">{task.title}</p>
                                <p className="text-sm text-gray-500">
                                    {task.desc}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEdit(task)}
                                    className="px-3 py-1 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => onDelete(task.id)}
                                    className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}

                </div>

               
                <div className="border-t p-3 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskEdit;