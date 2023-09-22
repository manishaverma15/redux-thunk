import React from 'react';
import { waitFor, screen, fireEvent } from '@testing-library/react';
import UserForm from '../UserForm';
import render from '../../../utils/render';
import { getUsers, postUser } from '../../../services/users';

jest.mock('../../../services/users');

describe('Form Component', () => {

  beforeAll(() => {
    jest.clearAllMocks();
  })

  const users = [{ id: 'test', name: 'John Roy', email: 'john@gmail.com', phoneNumber: '1234567890' }];

  it('render correctly when there are users', async () => {
    getUsers.mockReturnValue(users);
    const { asFragment } = render(<UserForm />);

    await waitFor(() => screen.getByTestId('user-table'));

    expect(screen.getByText('John Roy')).toBeInTheDocument();
    expect(screen.getByText('john@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it('render correctly when there no users', async () => {
    getUsers.mockReturnValue([]);
    const { asFragment } = render(<UserForm />);

    await waitFor(() => screen.getByTestId('user-table'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders when form is submitted correctly and values are added to the table', async () => {
    const mockUser = { id: 'test1', name: 'user', email: 'newuser@gmail.com', phoneNumber: '9876543210' }
    getUsers.mockReturnValue(users);
    postUser.mockReturnValue(mockUser);

    render(<UserForm />);

    await waitFor(() => screen.getByTestId('user-table'));

    fireEvent.change(screen.getByTestId("name-input"), { target: { value: mockUser.name } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: mockUser.email } });
    fireEvent.change(screen.getByTestId('phone-input'), { target: { value: mockUser.phoneNumber } });

    fireEvent.submit(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText('user')).toBeInTheDocument();
      expect(screen.getByText('newuser@gmail.com')).toBeInTheDocument();
      expect(screen.getByText('9876543210')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('delete-button'));
    expect(screen.queryByText('user')).not.toBeInTheDocument();
  });

});