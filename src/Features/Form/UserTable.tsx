import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, getUsers } from './UserSlice';
import { AppDispatch } from '../../store';

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

      {data && data.length > 0 ? (
        <div>
          <h2>Submitted Users</h2>
          <table className='user-table'>
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
                  <td><button onClick={() => props.handleEdit(user.id)}>Edit</button></td>
                  <td><button onClick={() => props.handleDelete(user.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
        : ''}
    </>
  )
}

export default UserTable;