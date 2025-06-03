import express from 'express';
import { verifyPayment,createOrder } from '../controllers/paymentController';

const router = express.Router();

/**
 * @openapi
 * /api/v1/verifyPayment:
 *   post:
 *     tags:
 *       - Payments
 *     summary: Verify payment after client completes transaction
 *     description: Verifies payment signature and saves the payment record associated with an order and user email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "order_12345"
 *               paymentId:
 *                 type: string
 *                 example: "pay_67890"
 *               signature:
 *                 type: string
 *                 example: "abcdef1234567890"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *             required:
 *               - orderId
 *               - paymentId
 *               - signature
 *               - email
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment verified successfully"
 *                 payment:
 *                   type: object
 *                   description: Payment details saved in database
 *       400:
 *         description: Invalid signature error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid signature"
 *       500:
 *         description: Internal server error during payment verification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post('/verifyPayment', verifyPayment);
router.post('/createOrder', createOrder); // New route

export default router;
