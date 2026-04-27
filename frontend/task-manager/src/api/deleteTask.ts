import axiosClient from './axiosClient';

export const deleteTask = (id: number) => axiosClient.delete(`/tasks/${id}/`);
