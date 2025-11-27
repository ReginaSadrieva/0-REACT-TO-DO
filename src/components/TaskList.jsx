import Task from './Task';

const TaskList = ({
  tasks,
  onToggle,
  onDelete,
  editingId,
  onEdit,
  onSave,
  onCancel,
}) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
          isEditing={editingId === task.id} // only this task shows edit input
        />
      ))}
    </ul>
  );
};

export default TaskList;
