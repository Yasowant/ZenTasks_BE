import { Response } from 'express';
import { AuthRequest } from '../types/express';
import * as paymentService from '../services/paymentService';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { amount, email } = req.body;
    const order = await paymentService.createOrder(amount, email);
    res.status(200).json(order);
  } catch (error: any) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ message: 'Failed to create order' });
  }
};


export const verifyPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { orderId, paymentId, signature, email } = req.body;
    const payment = await paymentService.verifyAndSavePayment({ orderId, paymentId, signature, email });

        // Mark user as paid
    await paymentService.markUserAsPaid(email);

    console.log('Payment verified successfully:', payment);
    // Return success response
    res.status(200).json({ message: 'Payment verified successfully', payment });
  } catch (error: any) {
    console.error('Payment verification error:', error.message);
    const statusCode = error.message === 'Invalid signature' ? 400 : 500;
    res.status(statusCode).json({ message: error.message });
  }
};

