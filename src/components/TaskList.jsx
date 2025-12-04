import Task from './Task';
import PropTypes from 'prop-types';

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

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  editingId: PropTypes.number,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  editingId: null,
};

export default TaskList;
