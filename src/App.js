import React, { useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, updateUsername, deleteUser } from './features/Users';

function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.value);

  const getNextUserId = () => {
    if (userList.length === 0) {
      return 1; // If userList is empty, start from ID 1
    }
    return userList[userList.length - 1].id + 1;
  };

  const handleAddUser = () => {
    const newUser = {
      id: getNextUserId(),
      name: name,
      username: username,
    };
    dispatch(addUser(newUser));
  };

  return (
    <div className="App">
      <h1>REDUX STATE MANAGEMENT | CRUD</h1>
      <div className='addUser'>
        <input
          className='designGamay1'
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder='Name...'
        />
        <input
          className='designGamay2'
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username...'
        />
        <button  className='buttonGamay' onClick={handleAddUser}>Add User</button>
      </div>

      <div className='displayUsers'>
        {userList.map((user) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <h1>{user.username}</h1>
      
           <br />
            <input
            type="text"
            className='designGamay3'
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder='New username'
          />
          <button  className='buttonGamay3' onClick={() => dispatch(updateUsername({ id: user.id, username: newUsername }))}>
            Update Username
          </button>
          <button className='buttonGamay1' onClick={() => dispatch(deleteUser({ id: user.id }))}>
            Delete User
          </button>
          
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
