import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    projectGroup: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model('Todo', todoSchema);
