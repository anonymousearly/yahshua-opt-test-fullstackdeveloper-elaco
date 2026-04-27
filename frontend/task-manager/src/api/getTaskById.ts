import axiosClient from './axiosClient';
import type { Task } from '../types/task';

export const getTaskById = (id: number) => axiosClient.get<Task>(`/tasks/${id}/`);
