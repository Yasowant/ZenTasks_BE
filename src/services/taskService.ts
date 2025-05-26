import { Task } from '../models/Task';
import { Todo } from '../models/Todo';

export const createTask = async (data: any) => {
  const { projectId } = data;

  // Check if project exists and allows tasks
  const project = await Todo.findById(projectId);
  if (!project) {
    throw new Error('Project not found');
  }

  if (!project.applicationCustom?.tasks) {
    throw new Error('Tasks are not enabled for this project');
  }

  return Task.create(data);
};

export const getTasksByProjectId = async (projectId: string) => {
  return Task.find({ projectId });
};

export const updateTask = async (id: string, data: any) => {
  return Task.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTask = async (id: string) => {
  return Task.findByIdAndDelete(id);
};
