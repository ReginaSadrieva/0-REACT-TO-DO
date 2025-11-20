import Task from './Task';

const tasks = [
  { description: 'Completed task', completed: true },
  { description: 'Active task', completed: false },
];

export default function TaskList() {
  return (
    <ul className="todo-list">
      {tasks.map((task, index) => (
        <Task
          key={index}
          description={task.description}
          completed={task.completed}
        />
      ))}
    </ul>
  );
}
