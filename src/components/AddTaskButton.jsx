const AddTaskButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-md shadow font-medium"
        >
            + Nueva tarea
        </button>
    );
};

export default AddTaskButton;
