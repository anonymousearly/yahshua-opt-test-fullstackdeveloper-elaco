import { useState, useCallback, useRef } from 'react';
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
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(msg);
    setToastVisible(true);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3000);
  }, []);

  const { handleCreate, submitting } = useCreateTask(setTasks);
  const { handleUpdate } = useUpdateTask(setTasks);
  const { handlePatch } = usePatchTask(setTasks, () => showToast('Task completed!'));
  const { handleDelete } = useDeleteTask(setTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  async function handleSubmit(data: TaskPayload) {
    if (editingTask) {
      await handleUpdate(editingTask.id, data);
      setEditingTask(null);
    } else {
      await handleCreate(data);
      showToast('Task added!');
    }
  }

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

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
          submitting={submitting}
        />
        <TaskList
          activeTasks={activeTasks}
          completedTasks={completedTasks}
          loading={loading}
          error={error}
          onToggle={handlePatch}
          onEdit={setEditingTask}
          onDelete={handleDelete}
        />
      </main>
      {toastVisible && <div className="toast">{toastMsg}</div>}
    </div>
  );
}
