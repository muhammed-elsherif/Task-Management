import type { NextApiRequest, NextApiResponse } from 'next';
import axios from '../../../utils/axios';
import { Task } from '../../../types/task';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query: { id } } = req;

  switch (method) {
    case 'GET':
      try {
        const response = await axios.get<Task>(`/tasks/${id}`);
        res.status(200).json(response.data);
      } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
      }
      break;
    case 'PUT':
      try {
        const { title, description, dueDate, completed, category } = req.body;
        await axios.put(`/tasks/${id}`, { title, description, dueDate, completed, category });
        res.status(200).json({ message: 'Task updated successfully' });
      } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
      }
      break;
    case 'DELETE':
      try {
        await axios.delete(`/tasks/${id}`);
        res.status(200).json({ message: 'Task deleted successfully' });
      } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
