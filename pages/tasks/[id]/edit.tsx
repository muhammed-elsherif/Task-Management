import { useState, useEffect, FormEvent } from 'react';
import axios from '../../../utils/axios';
import { useRouter } from 'next/router';
import { getUserIdFromToken } from '../../../utils/auth';
import { Task } from '../../../types/task';

const EditTask = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [category, setCategory] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const response = await axios.get<Task>(`/tasks/${id}`);
          setTask(response.data);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setDueDate(new Date(response.data.dueDate).toISOString().split('T')[0]);
          setCompleted(response.data.isCompleted);
          setCategory(response.data.category);
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      };

      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const userId = getUserIdFromToken();
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    try {
      await axios.put(`/tasks/${id}`, { title, description, dueDate, completed, category, userId });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <h1>Edit Task</h1>
      {task ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <label>
            Completed:
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </label>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <button type="submit">Update Task</button>
        </form>
      ) : (
        <p>Loading task...</p>
      )}
    </div>
  );
};

export default EditTask;
