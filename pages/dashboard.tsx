import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { Task } from '../types/task';
import Sidebar from '@/components/Sidebar';
import '../src/app/globals.css'

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Group tasks by category
  const tasksByCategory = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as { [key: string]: Task[] });

  return (
    <div className='flex'>
      <Sidebar tasksByCategory={tasksByCategory} />
      <div className="flex-1 p-6 bg-black">
        <h1 className="text-white">Task Dashboard</h1>
        {/* Other content here */}
      </div>
    </div>
  );
};

export default Dashboard;
