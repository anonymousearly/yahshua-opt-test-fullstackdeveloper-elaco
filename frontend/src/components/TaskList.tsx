import type { Task } from '../types/task';
import TaskItem from './TaskItem';

interface Props {
  activeTasks: Task[];
  completedTasks: Task[];
  loading: boolean;
  error: boolean;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({
  activeTasks,
  completedTasks,
  loading,
  error,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  if (loading) return <p className="state-msg">Loading tasks...</p>;
  if (error) return <p className="state-msg error">Failed to load tasks.</p>;
  if (activeTasks.length === 0 && completedTasks.length === 0)
    return <p className="state-msg">No tasks yet. Add one above.</p>;

  return (
    <div className="task-sections">
      <section className="task-section">
        <h2 className="section-heading">Active <span className="task-count">{activeTasks.length}</span></h2>
        {activeTasks.length === 0 ? (
          <p className="state-msg">No active tasks.</p>
        ) : (
          <div className="scrollable-list">
            {activeTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        )}
      </section>

      {completedTasks.length > 0 && (
        <section className="task-section">
          <h2 className="section-heading">Completed <span className="task-count completed-count">{completedTasks.length}</span></h2>
          <div className="scrollable-list">
            {completedTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
