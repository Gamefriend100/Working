import { useState, useEffect } from "react";

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDesc(task.desc);
            setDueDate(task.dueDate.toISOString().split("T")[0]);
        } else {
            setTitle("");
            setDesc("");
            setDueDate("");
        }
    }, [task]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        onSave({
            id: task?.id ?? crypto.randomUUID(),
            title,
            desc,
            completed: task?.completed ?? false,
            dueDate: new Date(dueDate)
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">

              
                <div className="bg-emerald-700 px-5 py-3">
                    <h2 className="text-white text-lg font-semibold">
                        {task ? "Editar tarea" : "Nueva tarea"}
                    </h2>
                    <p className="text-emerald-100 text-sm">
                        Gestión de actividades
                    </p>
                </div>

              
                <form onSubmit={handleSubmit} className="px-5 py-4 flex flex-col gap-3">

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Título
                        </label>
                        <input
                            type="text"
                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Descripción
                        </label>
                        <textarea
                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            rows={3}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Fecha de vencimiento
                        </label>
                        <input
                            type="date"
                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 pt-4 border-t mt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-emerald-700 text-white hover:bg-emerald-800 shadow"
                        >
                            Guardar
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
