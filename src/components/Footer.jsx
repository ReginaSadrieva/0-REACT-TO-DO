import TasksFilter from './TasksFilter';

const Footer = ({
  activeCount,
  hasCompleted,
  filter,
  onFilterChange,
  onClearCompleted,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> {activeCount === 1 ? 'item' : 'items'}{' '}
        left
      </span>

      <TasksFilter filter={filter} onFilterChange={onFilterChange} />

      {hasCompleted && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
