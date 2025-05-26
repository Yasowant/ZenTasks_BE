import { Response } from 'express';
import { AuthRequest } from '../types/express';
import * as taskService from '../services/taskService';

export const createTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTasks = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const tasks = await taskService.getTasksByProjectId(
      req.query.projectId as string
    );
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const updateTask = await taskService.updateTask(req.params.id, req.body);
    if (!updateTask) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(updateTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const deleted = await taskService.deleteTask(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Task not found' });
    }
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
