import { Response } from 'express';
import { AuthRequest } from '../types/express';
import * as groupService from '../services/groupService';

export const createGroup = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { groupName, groupDescription, groupAdministrator } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (!groupName) {
      res.status(400).json({ message: 'Group name is required' });
      return;
    }

    // ✅ Check if group with same name exists for the user
    const existingGroup = await groupService.findGroupByNameAndUser(
      groupName,
      userId
    );
    if (existingGroup) {
      res
        .status(409)
        .json({
          success: false,
          message: 'Group with this name already exists',
        });
      return;
    }

    const group = await groupService.createGroup(
      { groupName, groupDescription, groupAdministrator },
      userId
    );

    res.status(201).json({ success: true, data: group });
  } catch (error) {
    console.error('Create Group Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getGroups = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const groups = await groupService.getGroups(userId);
    res.status(200).json({ success: true, data: groups });
  } catch (error) {
    console.error('Get Groups Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
