import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { generateToken } from '../utils/token';

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
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
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
  }
};
