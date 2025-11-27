import { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';

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

export default Task;
