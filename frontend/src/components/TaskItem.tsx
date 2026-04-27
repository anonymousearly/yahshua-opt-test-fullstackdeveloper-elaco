import type { Task } from '../types/task';

interface Props {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const date = new Date(task.created_at).toLocaleDateString();

  return (
    <div className={`task-item${task.completed ? ' completed' : ''}`}>
      <div className="task-left">
        <div className="task-content">
          <span className="task-title">{task.title}</span>
          {task.description && <p className="task-desc">{task.description}</p>}
          <span className="task-date">{date}</span>
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button className="btn-delete" onClick={() => onDelete(task.id)}>Delete</button>
        <label className="toggle-switch" title={task.completed ? 'Mark incomplete' : 'Mark complete'}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task)}
          />
          <span className="toggle-track">
            <span className="toggle-thumb" />
          </span>
          <span className="toggle-label">{task.completed ? 'Completed' : 'Pending'}</span>
        </label>
      </div>
    </div>
  );
}
