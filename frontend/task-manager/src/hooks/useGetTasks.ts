import { useState, useEffect } from 'react';
import { getTasks } from '../api/getTasks';
import type { Task } from '../types/task';

export function useGetTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTasks()
      .then((res) => setTasks(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { tasks, setTasks, loading, error };
}
