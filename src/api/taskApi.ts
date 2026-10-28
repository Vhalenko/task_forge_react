import api from "./client";
import type { Task } from "../types/task";

export const getMyTasks = () =>
  api.get<Task[]>("/users/me/tasks").then((res) => res.data);

export const getProjectTasks = (projectId: number) =>
  api.get<Task[]>(`/projects/${projectId}/tasks`).then((res) => res.data);

export const getTask = (id: number) =>
  api.get<Task>(`/tasks/${id}`).then((res) => res.data);
