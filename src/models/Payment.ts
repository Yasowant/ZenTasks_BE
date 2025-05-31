import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  signature: { type: String, required: true },
});

export const Payment = mongoose.model('Payment', paymentSchema);
