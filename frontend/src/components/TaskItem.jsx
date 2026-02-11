import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function TaskItem({ task, onEdit, onDelete }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'in progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      default: return 'status-pending';
    }
  };

  return (
    <Card className="task-card h-100">
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        {task.description && (
          <Card.Text className="text-muted">{task.description}</Card.Text>
        )}
        <div className="mb-3">
          <span className={`status-badge ${getStatusClass(task.status)}`}>
            {task.status}
          </span>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" size="sm" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="outline-danger" size="sm" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}