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
    assignedTo: {
      type: String,
    },
    status: {
      type: String,
      enum: ['No Progress', 'In Progress', 'Completed'],
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ['None', 'Low', 'Medium', 'High'],
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model('Task', taskSchema);
