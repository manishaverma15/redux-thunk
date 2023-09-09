import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, User } from './UserSlice';
import { v4 as uuidv4 } from 'uuid';
import './Form.css';
import UserTable from './UserTable';

interface FormProps {
  user?: User;
}

const UserForm: React.FC<FormProps> = ({ user }) => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users);

  const [formData, setFormData] = useState<User>({
    id: uuidv4(),
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      dispatch(addUser(formData));

    setFormData({
      id: uuidv4(),
      name: '',
      email: '',
      phoneNumber: ''
    })
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center' }}>React-Redux Form</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type='number'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type='submit'>{'Add User'}</button>
      </form>

      <UserTable />
    </>
  )
}

export default UserForm;