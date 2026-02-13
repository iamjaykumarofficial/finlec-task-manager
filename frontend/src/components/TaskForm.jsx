import React, { useState, useEffect } from 'react';

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
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional"
          rows="1"
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button type="submit" className="btn">
        {initialData ? 'Update Task' : 'Add Task'}
      </button>

      {initialData && (
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}