import { Response } from 'express';
import { AuthRequest } from '../types/express';
import * as todoService from '../services/todoService';
import redis from '../utils/redis';

const TODO_CACHE_PREFIX = 'todos:';

export const createTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const todo = await todoService.createTodo(req.body, req.user!.userId);
    await redis.del(`${TODO_CACHE_PREFIX}${req.user!.userId}`);
    res.status(201).json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTodos = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const cacheKey = `${TODO_CACHE_PREFIX}${userId}`;

    const cached = await redis.get(cacheKey);

    if (cached) {
      // Assuming redis returns stringified JSON
      const todos = JSON.parse(cached as string);
      res.json(todos);
      return;
    }

    const todos = await todoService.getTodos(userId);
    await redis.set(cacheKey, JSON.stringify(todos), { ex: 60 });

    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTodoById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const todo = await todoService.getTodoById(req.params.id, req.user!.userId);
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }
    res.json(todo);
  } catch (error) {
    console.error('Error fetching todo by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);
    await redis.del(`${TODO_CACHE_PREFIX}${req.user!.userId}`);
    res.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    await todoService.deleteTodo(req.params.id);
    await redis.del(`${TODO_CACHE_PREFIX}${req.user!.userId}`);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
