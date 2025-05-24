import { Router } from 'express';
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ApplicationCustom:
 *       type: object
 *       properties:
 *         tasks:
 *           type: boolean
 *           default: false
 *         discussion:
 *           type: boolean
 *           default: false
 *         milestone:
 *           type: boolean
 *           default: false
 *         issuetracker:
 *           type: boolean
 *           default: false
 *     Todo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         projectGroup:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         projectColor:
 *           type: string
 *         applicationCustom:
 *           $ref: '#/components/schemas/ApplicationCustom'
 *         userId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     TodoInput:
 *       type: object
 *       required:
 *         - title
 *         - projectGroup
 *       properties:
 *         projectGroup:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         projectColor:
 *           type: string
 *         applicationCustom:
 *           $ref: '#/components/schemas/ApplicationCustom'
 */

/**
 * @swagger
 * /api/v1/todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.post('/', authMiddleware, createTodo);

/**
 * @swagger
 * /api/v1/todos:
 *   get:
 *     summary: Get all todos for the logged-in user
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get('/', authMiddleware, getTodos);

/**
 * @swagger
 * /api/v1/todos/{id}:
 *   get:
 *     summary: Get a single todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: A single todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
router.get('/:id', authMiddleware, getTodoById);

/**
 * @swagger
 * /api/v1/todos/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
router.put('/:id', authMiddleware, updateTodo);

/**
 * @swagger
 * /api/v1/todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo to delete
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Todo not found
 */
router.delete('/:id', authMiddleware, deleteTodo);

export default router;
