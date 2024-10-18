import axios from 'axios';
import { Dispatch } from 'redux';

export const fetchTasks = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get('/api/tasks');
    dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_TASKS_ERROR', payload: error });
  }
};

export const createTask = (task) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post('/api/tasks', task);
    dispatch({ type: 'CREATE_TASK_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'CREATE_TASK_ERROR', payload: error });
  }
};

// Other actions like updateTask, deleteTask, etc.
