import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import './Form.css';
import { AppDispatch } from '../../store';
import { User } from '../../services/users';
import { updateUser, deleteUser, getUsers, postUser } from './userSlice';
import UserTable from './UserTable';

const UserForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: any) => state.users.data);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<User>({
    id: uuidv4(),
    name: '',
    email: '',
    phoneNumber: '',
  })

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      dispatch(updateUser(formData));
    }
    else {
      dispatch(postUser(formData));
    }

    setIsEditing(false)

    setFormData({
      id: uuidv4(),
      name: '',
      email: '',
      phoneNumber: ''
    })
  };

  const handleDelete = (id: any) => {
    dispatch(deleteUser(id))
  }

  const handleEdit = (id: any) => {
    if (users) {
      const selectedUser = users.find((user: User) => user.id === id)
      console.log('selected-user', selectedUser)
      if (selectedUser) {
        setFormData(selectedUser)
      }
      setIsEditing(true);
    }
  }

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
        <button type='submit'>{isEditing ? 'Update User' : 'Add User'}</button>
      </form>

      <UserTable handleEdit={handleEdit} handleDelete={handleDelete} />
    </>
  )
}

export default UserForm;