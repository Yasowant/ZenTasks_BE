import { Response } from 'express';
import { AuthRequest } from '../types/express';
import * as todoService from '../services/todoService';
import redis from '../utils/redis';

const TODO_CACHE_PREFIX = 'todos:';

export const createTodo = async (req: AuthRequest, res: Response) => {
  const todo = await todoService.createTodo(req.body, req.user!.userId);
  // Invalidate cache for the user after creation
  await redis.del(`${TODO_CACHE_PREFIX}${req.user!.userId}`);
  res.status(201).json(todo);
};

export const getTodos = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const cacheKey = `todos:${userId}`;
    const cached = (await redis.get(cacheKey)) as string | null;

    if (cached) {
      res.json(JSON.parse(cached));
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

export const getTodoById = async (req: AuthRequest, res: Response) => {
  const todo = await todoService.getTodoById(req.params.id, req.user!.userId);
  if (!todo) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }
  res.json(todo);
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
  const todo = await todoService.updateTodo(req.params.id, req.body);
  // Invalidate cache after update
  await redis.del(`${TODO_CACHE_PREFIX}${req.user!.userId}`);
  res.json(todo);
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  await todoService.deleteTodo(req.params.id);
  // Invalidate cache after delete
  await redis.del(`${TODO_CACHE_PREFIX}${req.user!.userId}`);
  res.json({ message: 'Todo deleted' });
};
