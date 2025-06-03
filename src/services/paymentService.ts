import crypto from 'crypto';
import { Payment } from '../models/Payment';
import { User } from '../models/User';
import Razorpay from 'razorpay';

interface PaymentData {
  orderId: string;
  paymentId: string;
  signature: string;
  email: string;
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createOrder = async (amount: number, email: string) => {
  const options = {
    amount: amount * 100, // amount in paise
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
    notes: { email },
  };

    const order = await razorpay.orders.create(options);
  return {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    razorpayKey: process.env.RAZORPAY_KEY_ID,
  };
};

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

    // ✅ Update user status
  await markUserAsPaid(email);

  return payment;
};

export const markUserAsPaid = async (email: string) => {
  const user = await User.findOne({ email });
  if (user) {
    user.hasPaid = true;
    await user.save();
  }
};

