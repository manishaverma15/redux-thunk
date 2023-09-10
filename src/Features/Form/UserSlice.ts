import { createSlice } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

const initialUserState: User[] = [];

const userSlice = createSlice({
  name: 'users',
  initialState: initialUserState,
  reducers: {
    addUser: (state, action) => {
      return [...state, action.payload]
    },

    updateUser: (state, action) => {
      return state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      )
    },

    deleteUser: (state, action) => {
      return state.filter((user) => user.id !== action.payload)
    }
  }
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
