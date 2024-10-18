import React from 'react';
import Link from 'next/link';
import { Task } from '../../types/task';

interface SidebarProps {
  tasksByCategory: { [key: string]: Task[] };
}

const Sidebar: React.FC<SidebarProps> = ({ tasksByCategory }) => {
  return (
    <div className="w-64 h-full shadow-md bg-white px-1 absolute overflow-y-auto">
      <ul className="relative">
        {Object.keys(tasksByCategory).map((category) => (
          <li key={category} className="relative">
            <div className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">
              {category}
            </div>
            <ul className="ml-4">
              {tasksByCategory[category].map((task) => (
                <li key={task.id} className="py-2">
                  <Link href={`/tasks/${task.id}`}>
                    {/* <a className="text-gray-600 hover:text-gray-800"> */}
                      {task.title}
                    {/* </a> */}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
