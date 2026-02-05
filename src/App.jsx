import { useState } from "react";
import TaskItem from "./components/TaskItem";
import TaskModal from "./components/TaskModal";
import TaskEdit from "./components/TaskEdit";
import TaskFilter from "./components/TaskFilter";

const App = () => {
  // 📌 Estado principal de tareas
  const [tasks, setTasks] = useState([
    { id: crypto.randomUUID(), title: "Tarea 1", desc: "Descripción 1", completed: true, dueDate: new Date(2025, 5, 1) },
    { id: crypto.randomUUID(), title: "Tarea 2", desc: "Descripción 2", completed: true, dueDate: new Date(2025, 11, 16) },
    { id: crypto.randomUUID(), title: "Tarea 3", desc: "Descripción 3", completed: false, dueDate: new Date(2025, 11, 16) },
  ]);

  // 📌 Estados de UI
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // 💾 Guardar o editar tarea
  const handleSaveTask = (task) => { setTasks(prev => prev.some(t => t.id === task.id) ? prev.map(t => (t.id === task.id ? task : t)) : [...prev, task]
    );
    setEditingTask(null);
  };

  // 🗑️ Eliminar tarea (confirmación)
  const handleDeleteTask = (id) => {
    setTaskToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDeleteTask = () => {
    setTasks(prev => prev.filter(t => t.id !== taskToDelete));
    setTaskToDelete(null);
    setIsConfirmOpen(false);
  };

  const cancelDeleteTask = () => {
    setTaskToDelete(null);
    setIsConfirmOpen(false);
  };

  // ✅ NUEVO: marcar / desmarcar tarea
  const checkTask = (id) => {setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed }: t));};

  // 🔍 Filtrar por texto
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(filterText.toLowerCase()) ||
    task.desc.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 m-5">
      <div className="flex justify-between items-center">
        <p className="text-4xl font-bold">Lista de tareas</p>

        <button
          onClick={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-md shadow font-medium"
        >
          + Agregar Tarea
        </button>
      </div>

      <TaskFilter onFilter={setFilterText} />

      <hr />

      {filteredTasks.length === 0 && (
        <p className="text-center text-gray-500">
          No se encontraron tareas
        </p>
      )}

      {/* 📋 Lista de tareas */}
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={(task) => {
            setEditingTask(task);
            setIsModalOpen(true);
          }}
          onDelete={handleDeleteTask}
          onCheck={checkTask}  
        />
      ))}
        
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

      <TaskModal
        isOpen={isConfirmOpen}
        mode="confirm"
        onClose={cancelDeleteTask}
        onConfirm={confirmDeleteTask}
      />

      <TaskModal
        isOpen={isModalOpen}
        mode="form"
        task={editingTask}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default App;
