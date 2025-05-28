import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskInput:
 *       type: object
 *       required:
 *         - title
 *         - projectId
 *       properties:
 *         title:
 *           type: string
 *           example: Implement login feature
 *         taskDescription:
 *           type: string
 *           example: Integrate JWT-based login API with frontend
 *         projectId:
 *           type: string
 *           description: ID of the parent project (Todo)
 *           example: 6650fb8f51df4c7c2367c2f2
 *         assignedTo:
 *           type: string
 *           example: john.doe@example.com
 *         status:
 *           type: string
 *           enum: [No Progress, In Progress, Completed]
 *           example: In Progress
 *         dueDate:
 *           type: string
 *           format: date
 *           example: 2025-06-30
 *         priority:
 *           type: string
 *           enum: [None, Low, Medium, High]
 *           example: High
 *     Task:
 *       allOf:
 *         - $ref: '#/components/schemas/TaskInput'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: 66510c9e892cd1a403ddc623
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: 2025-05-28T09:30:00Z
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: 2025-05-28T10:00:00Z
 */

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task under a Todo project
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Tasks are not enabled for this project or bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/', authMiddleware, createTask);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get tasks by project ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the project to retrieve tasks for
 *     responses:
 *       200:
 *         description: List of tasks for a project
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware, getTasks);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authMiddleware, async (req, res) => {
  await updateTask(req, res);
});

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  await deleteTask(req, res);
});

export default router;
