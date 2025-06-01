import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from '../models/User';
import { Payment } from '../models/Payment';
import { generateToken } from '../utils/token';
import { sendResetEmail } from '../utils/sendResetEmail';

export const resolvers = {
  login: async ({ email, password }: any) => {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const { accessToken, refreshToken } = generateToken(user._id.toString());
    return { token: accessToken, refreshToken };
  },

  register: async ({ name, email, password }: any) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    // ✅ Check if this email has completed a payment
    const payment = await Payment.findOne({ email });
    if (!payment) throw new Error('Payment required before registration');

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      hasPaid: true,
    });
    return user;
  },
  getUser: async ({ id }: any) => {
    const user = await User.findById(id).select('-password');
    if (!user) throw new Error('User not found');
    return user;
  },

  updateUser: async ({ id, name, email }: any) => {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();
    return user;
  },

  logout: async ({ refreshToken }: any) => {
    // Without token storage, simply trust client to delete tokens
    return true;
  },

  forgotPassword: async ({ email }: any) => {
    const user = await User.findOne({ email });
    if (!user) return true;

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    await sendResetEmail(email, token);
    return true;
  },

  resetPassword: async ({ token, newPassword }: any) => {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) throw new Error('Invalid or expired token');

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return true;
  },
};
