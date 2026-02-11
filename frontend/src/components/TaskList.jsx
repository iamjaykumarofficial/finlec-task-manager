import React from 'react';
import TaskItem from './TaskItem';
import { Row, Col, Alert } from 'react-bootstrap';

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <Alert variant="info">No tasks yet. Create one!</Alert>;
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {tasks.map(task => (
        <Col key={task.id}>
          <TaskItem
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
          />
        </Col>
      ))}
    </Row>
  );
}