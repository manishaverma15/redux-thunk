import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { User } from '../../services/users';
import { getUsers } from './userSlice';

const UserTable = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: any) => state.users);

  useEffect(() => {
    dispatch(getUsers())
  }, []);

  return (
    <>
      {
        loading &&
        <div>
          <h1>Loading....</h1>
        </div>
      }

      {
        error && <div>
          <h2>{error}</h2>
        </div>
      }

      {data && (
        <div className='user-table'>
          <h2>Submitted Users</h2>
          <table data-testid='user-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user: User) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td data-testid='edit-button'><button onClick={() => props.handleEdit(user.id)}>Edit</button></td>
                  <td data-testid='delete-button'><button onClick={() => props.handleDelete(user.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default UserTable;