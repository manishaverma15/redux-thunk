import React from 'react';
import { useSelector } from 'react-redux';
import { User } from './UserSlice';

const UserTable = (props: any) => {

  const users = useSelector((state: any) => state.users);

  return (
    <>
      {users.length > 0 ? (
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
              {users.map((user: User) => (
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