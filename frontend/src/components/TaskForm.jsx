import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function TaskForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setStatus(initialData.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, status });
    if (!initialData) {
      setTitle('');
      setDescription('');
      setStatus('pending');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 p-4 bg-white rounded shadow-sm">
      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Optional"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2} className="d-flex align-items-end">
          <Button variant="primary" type="submit" className="me-2">
            {initialData ? 'Update' : 'Add'} Task
          </Button>
          {initialData && (
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
}