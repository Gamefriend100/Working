const TaskFilter = ({ onFilter }) => {
    return (
        <div className="bg-white rounded-md shadow p-4 flex flex-col gap-3">

            <p className="font-semibold text-emerald-700">
                Filtrar tareas
            </p>

            <input
                type="text"
                placeholder="Buscar por título o descripción"
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                onChange={(e) => onFilter(e.target.value)}
            />
        </div>
    );
};

export default TaskFilter;