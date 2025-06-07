import { Group } from '../models/Group';

export const createGroup = async (data: any, userId: string) => {
  return Group.create({ ...data, userId });
};

export const getGroups = async (userId: string) => {
  return Group.find({ userId });
};

export const findGroupByNameAndUser = async (
  groupName: string,
  userId: string
) => {
  return Group.findOne({ groupName, userId });
};
