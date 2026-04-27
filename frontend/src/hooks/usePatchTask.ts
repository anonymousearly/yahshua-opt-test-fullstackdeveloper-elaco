import { patchTask } from '../api/patchTask';
import type { Task } from '../types/task';

export function usePatchTask(
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  onComplete?: () => void
) {
  const handlePatch = async (task: Task) => {
    const res = await patchTask(task.id, { completed: !task.completed });
    setTasks((prev) => prev.map((t) => (t.id === res.data.id ? res.data : t)));
    if (!task.completed && onComplete) {
      onComplete();
    }
  };

  return { handlePatch };
}
