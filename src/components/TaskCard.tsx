import React from 'react';

const TaskCard = ({ title, participant, dateAdded, priority, status }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm">Participant: {participant}</p>
      <p className="text-sm">Date added: {dateAdded}</p>
      <p className={`text-sm ${priority.toLowerCase()}`}>Priority: {priority}</p>
      <p className={`text-sm ${status.toLowerCase()}`}>Status: {status}</p>
    </div>
  );
};

export default TaskCard;
