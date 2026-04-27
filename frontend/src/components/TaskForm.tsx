import { useState, useEffect } from 'react';
import type { Task, TaskPayload } from '../types/task';

interface Props {
  editingTask: Task | null;
  onSubmit: (data: TaskPayload) => Promise<void>;
  onCancel: () => void;
  submitting?: boolean;
}

export default function TaskForm({ editingTask, onSubmit, onCancel, submitting }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description ?? '');
    } else {
      setTitle('');
      setDescription('');
    }
    setTitleError('');
    setError('');
  }, [editingTask]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }
    if (title.trim().length < 3) {
      setTitleError('Title must be at least 3 characters');
      return;
    }
    setTitleError('');
    setError('');
    try {
      await onSubmit({ title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
    } catch {
      setError('Failed to save task. Please try again.');
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && <span className="field-error">{titleError}</span>}
      </div>
      <div className="form-group">
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <span className="spinner" />
              Sending…
            </>
          ) : editingTask ? 'Save Changes' : 'Add Task'}
        </button>
        {editingTask && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
