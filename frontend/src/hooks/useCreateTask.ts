import { useState } from 'react';
import { createTask } from '../api/createTask';
import type { Task, TaskPayload } from '../types/task';

export function useCreateTask(setTasks: React.Dispatch<React.SetStateAction<Task[]>>) {
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (data: TaskPayload) => {
    setSubmitting(true);
    try {
      const res = await createTask(data);
      setTasks((prev) => [res.data, ...prev]);
    } finally {
      setSubmitting(false);
    }
  };

  return { handleCreate, submitting };
}
