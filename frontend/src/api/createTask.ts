import axiosClient from './axiosClient';
import type { Task, TaskPayload } from '../types/task';

export const createTask = (data: TaskPayload) => axiosClient.post<Task>('/tasks/', data);
