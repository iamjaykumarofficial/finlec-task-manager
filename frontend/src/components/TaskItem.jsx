import React from 'react';

export default function TaskItem({ task, onEdit, onDelete }) {
  const getStatusClass = () => {
    switch (task.status) {
      case 'pending': return 'status-pending';
      case 'in progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      default: return 'status-pending';
    }
  };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <span className={`status-badge ${getStatusClass()}`}>
        {task.status}
      </span>
      <div className="task-actions">
        <button className="btn-edit" onClick={onEdit}>Edit</button>
        <button className="btn-delete" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}