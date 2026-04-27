import axiosClient from './axiosClient';
import type { Task } from '../types/task';

export const getTasks = () => axiosClient.get<Task[]>('/tasks/');
