import axiosClient from './axiosClient';
import type { Task, TaskPayload } from '../types/task';

export const updateTask = (id: number, data: TaskPayload) => axiosClient.put<Task>(`/tasks/${id}/`, data);
