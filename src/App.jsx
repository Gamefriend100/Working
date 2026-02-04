import { useState } from "react";
import TaskItem from "./components/TaskItem";
import AddTaskButton from "./components/AddTaskButton";
import TaskModal from "./components/TaskModal";
import TaskEdit from "./components/TaskEdit";
import TaskFilter from "./components/TaskFilter";

const App = () => {

    const [tasks, setTasks] = useState([
        { id: crypto.randomUUID(), title: 'Tarea 1', desc: 'Descripción 1', completed: false, dueDate: new Date(2025, 5, 1) },
        { id: crypto.randomUUID(), title: 'Tarea 2', desc: 'Descripción 2', completed: true, dueDate: new Date(2025, 11, 16) },
        { id: crypto.randomUUID(), title: 'Tarea 3', desc: 'Descripción 3', completed: false, dueDate: new Date(2025, 11, 16) },
    ]);

    // Modales
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Filtro
    const [filterText, setFilterText] = useState("");

    // Guardar (crear o editar)
    const handleSaveTask = (task) => {
        setTasks(prev =>
            prev.some(t => t.id === task.id)
                ? prev.map(t => t.id === task.id ? task : t)
                : [...prev, task]
        );
    };

    // Eliminar
    const handleDeleteTask = (id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    // Tareas filtradas
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(filterText.toLowerCase()) ||
        task.desc.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-4 m-5">

            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="text-4xl font-bold">Lista de tareas</p>

                <div className="flex gap-2">
                    <button
                        onClick={() => setIsEditOpen(true)}
                        className="border border-emerald-700 text-emerald-700 px-4 py-2 rounded-md hover:bg-emerald-50"
                    >
                        Administrar tareas
                    </button>

                    <AddTaskButton
                        onClick={() => {
                            setEditingTask(null);
                            setIsModalOpen(true);
                        }}
                    />
                </div>
            </div>

            {/* Filtro */}
            <TaskFilter onFilter={setFilterText} />

            <hr className="py-2" />

            {/* Lista */}
            {filteredTasks.length === 0 && (
                <p className="text-center text-gray-500">
                    No se encontraron tareas
                </p>
            )}

            {filteredTasks.map(task => (
                <div
                    key={task.id}
                    onDoubleClick={() => {
                        setEditingTask(task);
                        setIsModalOpen(true);
                    }}
                >
                    <TaskItem task={task} />
                </div>
            ))}

            {/* Modal administrador */}
            <TaskEdit
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                tasks={tasks}
                onEdit={(task) => {
                    setEditingTask(task);
                    setIsModalOpen(true);
                    setIsEditOpen(false);
                }}
                onDelete={handleDeleteTask}
            />

            {/* Modal crear / editar */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTask}
                task={editingTask}
            />
        </div>
    );
};

export default App;
