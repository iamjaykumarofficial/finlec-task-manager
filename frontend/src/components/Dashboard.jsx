import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const res = await api.post('/tasks', task);
      setTasks([res.data, ...tasks]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id, updated) => {
    try {
      const res = await api.put(`/tasks/${id}`, updated);
      setTasks(tasks.map(t => t.id === id ? res.data : t));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Finlec Tasks</h1>
        <div className="user-info">
          <span>Signed in as <strong>{user?.email}</strong></span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>
      <TaskForm
        key={editingTask ? editingTask.id : 'new'}
        onSubmit={editingTask ? (data) => updateTask(editingTask.id, data) : addTask}
        initialData={editingTask}
        onCancel={() => setEditingTask(null)}
      />
      <TaskList
        tasks={tasks}
        onEdit={setEditingTask}
        onDelete={deleteTask}
      />
    </div>
  );
}