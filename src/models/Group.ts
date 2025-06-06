import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    groupName: {
      type: String,
      require: true,
    },
    groupDescription: {
      type: String,
    },
    groupAdministrator: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Group = mongoose.model('Group', groupSchema);
