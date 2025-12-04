import { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const Task = ({
  task,
  onToggle,
  onDelete,
  onEdit,
  onSave,
  onCancel,
  isEditing,
}) => {
  const [editText, setEditText] = useState(task.description);
  const editInputRef = useRef(null);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSave(task.id, editText);
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <li
      className={`${task.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <label onDoubleClick={() => onEdit(task.id)}>
          <span className="description">{task.description}</span>
          <span className="created">
            created {formatDistanceToNow(task.createdAt, { addSuffix: true })}
          </span>
        </label>
        <button
          className="icon icon-edit"
          onClick={() => onEdit(task.id)}
        ></button>
        <button
          className="icon icon-destroy"
          onClick={() => onDelete(task.id)}
        ></button>
      </div>

      {/* Edit input — visible only when this task is being edited */}
      {isEditing && (
        <input
          className="edit"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => onSave(task.id, editText)} // save on blur (optional)
          ref={editInputRef}
        />
      )}
    </li>
  );
};

// PropTypes — helps catch bugs and makes code self-documenting
Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

// defaultProps — safe defaults
Task.defaultProps = {
  isEditing: false,
};
export default Task;
