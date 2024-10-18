// src/components/TaskList.tsx
import React, { useState } from 'react';

const TaskList = ({ tasks }: any) => {
  const [filter, setFilter] = useState('');

  const filteredTasks = tasks.filter((task: any) =>
    task.category.includes(filter)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by category"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredTasks.map((task: any) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
