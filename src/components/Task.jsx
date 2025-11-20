export default function Task({ description, completed }) {
  return (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" defaultChecked={completed} />
        <label>
          <span className="description">{description}</span>
          <span className="created">created 17 seconds ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
    </li>
  );
}
