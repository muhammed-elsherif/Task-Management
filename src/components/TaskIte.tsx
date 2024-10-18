import axios from '../../utils/axios';
import { useRouter } from 'next/router';
import { Task } from '../../types/task';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(`/tasks/${task.id}`);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p>Category: {task.category}</p>
      <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
      <button onClick={() => router.push(`/tasks/${task.id}/edit`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
