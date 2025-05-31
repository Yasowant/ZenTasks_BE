import { Response } from 'express';
import { AuthRequest } from '../types/express';
import * as paymentService from '../services/paymentService';

export const verifyPayment = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { orderId, paymentId, signature, email } = req.body;

    const payment = await paymentService.verifyAndSavePayment({
      orderId,
      paymentId,
      signature,
      email,
    });

    res.status(200).json({ message: 'Payment verified successfully', payment });
  } catch (error: any) {
    console.error('Payment verification error:', error.message);

    const statusCode = error.message === 'Invalid signature' ? 400 : 500;
    res.status(statusCode).json({ message: error.message });
  }
};

