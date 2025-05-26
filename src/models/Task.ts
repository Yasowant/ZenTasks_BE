import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    taskDescription: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model('Task', taskSchema);
