import type { NextApiRequest, NextApiResponse } from 'next';
import axios from '../../../utils/axios';
import { Task } from '../../../types/task';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const response = await axios.get<Task[]>('/tasks');
        res.status(200).json(response.data);
      } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
      }
      break;
    case 'POST':
      try {
        const { title, description, dueDate, category } = req.body;
        const response = await axios.post<Task>('/tasks', { title, description, dueDate, category });
        res.status(201).json(response.data);
      } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
