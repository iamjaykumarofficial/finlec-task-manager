import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <div className="no-tasks">✨ No tasks yet. Create your first task!</div>;
  }

  return (
    <div className="task-grid">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  );
}