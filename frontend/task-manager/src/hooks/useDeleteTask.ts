import { deleteTask } from '../api/deleteTask';
import type { Task } from '../types/task';

export function useDeleteTask(setTasks: React.Dispatch<React.SetStateAction<Task[]>>) {
  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { handleDelete };
}
