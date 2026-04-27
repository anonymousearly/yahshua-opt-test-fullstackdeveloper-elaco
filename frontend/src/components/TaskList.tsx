import type { Task } from '../types/task';
import TaskItem from './TaskItem';

interface Props {
  tasks: Task[];
  loading: boolean;
  error: boolean;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, loading, error, onToggle, onEdit, onDelete }: Props) {
  if (loading) return <p className="state-msg">Loading tasks...</p>;
  if (error) return <p className="state-msg error">Failed to load tasks.</p>;
  if (tasks.length === 0) return <p className="state-msg">No tasks yet. Add one above.</p>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
