import { createTask } from '../api/createTask';
import type { Task, TaskPayload } from '../types/task';

export function useCreateTask(setTasks: React.Dispatch<React.SetStateAction<Task[]>>) {
  const handleCreate = async (data: TaskPayload) => {
    const res = await createTask(data);
    setTasks((prev) => [res.data, ...prev]);
  };

  return { handleCreate };
}
