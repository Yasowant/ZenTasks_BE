import { Router } from 'express';
import { createGroup, getGroups } from '../controllers/groupController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Group management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         groupName:
 *           type: string
 *         groupDescription:
 *           type: string
 *         groupAdministrator:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     GroupInput:
 *       type: object
 *       required:
 *         - groupName
 *       properties:
 *         groupName:
 *           type: string
 *         groupDescription:
 *           type: string
 *         groupAdministrator:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GroupInput'
 *     responses:
 *       201:
 *         description: Group created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       400:
 *         description: Group name is required
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, createGroup);

/**
 * @swagger
 * /api/v1/groups:
 *   get:
 *     summary: Get all groups for the logged-in user
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, getGroups);

export default router;
