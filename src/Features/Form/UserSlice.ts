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
  }
});

export const { addUser} = userSlice.actions;
export default userSlice.reducer;
