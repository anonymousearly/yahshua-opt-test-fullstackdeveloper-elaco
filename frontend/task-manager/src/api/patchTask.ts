import axiosClient from './axiosClient';
import type { Task } from '../types/task';

export const patchTask = (id: number, data: Partial<Task>) => axiosClient.patch<Task>(`/tasks/${id}/`, data);
