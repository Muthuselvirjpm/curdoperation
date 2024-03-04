import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'https://crudcrud.com/api/50c2a1b87bd1414d85270ecf76c93fdf'; 

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createUser = async () => {
    try {
      await axios.post(`${API_URL}/users`, { name, age });
      getUsers();
      setName('');
      setAge('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const updateUser = async (id) => {
    try {
      await axios.put(`${API_URL}/users/${id}`, { name, age });
      getUsers();
      setName('');
      setAge('');
      setEditingId(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      getUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateUser(editingId);
    } else {
      createUser();
    }
  };

  const handleEdit = (user) => {
    setName(user.name);
    setAge(user.age);
    setEditingId(user._id);
  };

  return (
    <div className="container mt-5">
      <h1>Users</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input type="number" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
      </form>
      <ul className="list-group mt-3">
        {users.map(user => (
          <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
            {user.name}, {user.age}
            <div>
              <button className="btn btn-warning me-2" onClick={() => handleEdit(user)}>Edit</button>
              <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
