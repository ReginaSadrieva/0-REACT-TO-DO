import { useState } from 'react';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: 'Completed task',
      completed: true,
      createdAt: new Date(Date.now() - 17 * 1000), // 17 seconds ago
    },
    {
      id: 2,
      description: 'Editing task',
      completed: false,
      createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    },
    {
      id: 3,
      description: 'Active task',
      completed: false,
      createdAt: new Date(Date.now() - 5 * 60 * 1000),
    },
  ]);

  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Add new task
  const addTask = (description) => {
    if (!description.trim()) return;
    const newTask = {
      id: Date.now(),
      description: description.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Clear completed tasks
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={addTask} />
      </header>

      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </section>

      {tasks.length > 0 && (
        <Footer
          activeCount={activeCount}
          hasCompleted={tasks.some((t) => t.completed)}
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
        />
      )}
    </section>
  );
}

export default App;
