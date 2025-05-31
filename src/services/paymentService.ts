import crypto from 'crypto';
import { Payment } from '../models/Payment';

interface PaymentData {
  orderId: string;
  paymentId: string;
  signature: string;
  email: string;
}

export const verifyAndSavePayment = async ({
  orderId,
  paymentId,
  signature,
  email,
}: PaymentData) => {
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  if (generatedSignature !== signature) {
    throw new Error('Invalid signature');
  }

  const payment = await Payment.create({
    orderId,
    paymentId,
    signature,
    email,
  });
  return payment;
};
