import { updateTask } from '../api/updateTask';
import type { Task, TaskPayload } from '../types/task';

export function useUpdateTask(setTasks: React.Dispatch<React.SetStateAction<Task[]>>) {
  const handleUpdate = async (id: number, data: TaskPayload) => {
    const res = await updateTask(id, data);
    setTasks((prev) => prev.map((t) => (t.id === res.data.id ? res.data : t)));
  };

  return { handleUpdate };
}
