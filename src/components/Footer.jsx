import TasksFilter from './TasksFilter';
import PropTypes from 'prop-types';

// Footer shows: counter + filters + clear button
const Footer = ({
  activeCount,
  hasCompleted,
  filter,
  onFilterChange,
  onClearCompleted,
}) => {
  return (
    <footer className="footer">
      {/* Left: how many tasks left */}
      <span className="todo-count">
        <strong>{activeCount}</strong> {activeCount === 1 ? 'item' : 'items'}{' '}
        left
      </span>

      {/* Middle: All / Active / Completed */}
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />

      {/* Right: delete all completed */}
      {hasCompleted && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

Footer.propTypes = {
  activeCount: PropTypes.number.isRequired,
  hasCompleted: PropTypes.bool.isRequired,
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
