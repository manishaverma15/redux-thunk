import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, deleteUser, User, getUsers, postUser } from './UserSlice';
import { v4 as uuidv4 } from 'uuid';
import './Form.css';
import UserTable from './UserTable';
import { AppDispatch } from '../../store';

interface FormProps {
  user?: User;
}

const UserForm: React.FC<FormProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: any) => state.users);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<User>({
    id: uuidv4(),
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
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
      dispatch(updateUser(user));
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
    const selectedUser = users.find((user: User) => user.id === id)
    console.log('selected-user', selectedUser)
    if (selectedUser) {
      setFormData(selectedUser)
    }
    setIsEditing(true);
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