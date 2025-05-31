import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const orderId = 'order_xyz123'; // Replace with your test orderId
const paymentId = 'pay_xyz456'; // Replace with your test paymentId

const secret = process.env.RAZORPAY_KEY_SECRET;

if (!secret) {
  console.error('RAZORPAY_KEY_SECRET is not set in environment variables!');
  process.exit(1);
}

const signature = crypto
  .createHmac('sha256', secret)
  .update(`${orderId}|${paymentId}`)
  .digest('hex');

console.log('Generated Signature:', signature);
