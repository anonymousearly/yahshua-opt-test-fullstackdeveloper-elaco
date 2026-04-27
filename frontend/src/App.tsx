import { useState } from 'react';
import { useGetTasks } from './hooks/useGetTasks';
import { useCreateTask } from './hooks/useCreateTask';
import { useUpdateTask } from './hooks/useUpdateTask';
import { usePatchTask } from './hooks/usePatchTask';
import { useDeleteTask } from './hooks/useDeleteTask';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import type { Task, TaskPayload } from './types/task';
import './index.css';

export default function App() {
  const { tasks, setTasks, loading, error } = useGetTasks();
  const { handleCreate } = useCreateTask(setTasks);
  const { handleUpdate } = useUpdateTask(setTasks);
  const { handlePatch } = usePatchTask(setTasks);
  const { handleDelete } = useDeleteTask(setTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  async function handleSubmit(data: TaskPayload) {
    if (editingTask) {
      await handleUpdate(editingTask.id, data);
      setEditingTask(null);
    } else {
      await handleCreate(data);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
      </header>
      <main>
        <TaskForm
          editingTask={editingTask}
          onSubmit={handleSubmit}
          onCancel={() => setEditingTask(null)}
        />
        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onToggle={handlePatch}
          onEdit={setEditingTask}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}
