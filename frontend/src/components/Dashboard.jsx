import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const res = await api.post('/tasks', task);
    setTasks([res.data, ...tasks]);
  };

  const updateTask = async (id, updated) => {
    const res = await api.put(`/tasks/${id}`, updated);
    setTasks(tasks.map(t => t.id === id ? res.data : t));
    setEditingTask(null);
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="px-4">
        <Navbar.Brand href="#home">Finlec Tasks</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="me-3">
            Signed in as: <strong>{user?.email}</strong>
          </Navbar.Text>
          <Button variant="outline-danger" size="sm" onClick={logout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <Container className="dashboard">
        <TaskForm
          onSubmit={editingTask ? (data) => updateTask(editingTask.id, data) : addTask}
          initialData={editingTask}
          onCancel={() => setEditingTask(null)}
        />
        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={deleteTask}
        />
      </Container>
    </>
  );
}