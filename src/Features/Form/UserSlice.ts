import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../../store';
import { User, getUsers as getUsersAPI, postUser as postUserAPI } from '../../services/users';

type State = {
  data: User[];
  loading: boolean;
  error: any
}

const initialUserState: State = {
  data: [],
  loading: false,
  error: null,
};

export const getUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchStart())
    const users = await getUsersAPI();

    dispatch(fetchSuccess(users))

  } catch (error: any) {
    dispatch(fetchError(error.message))
  }
}

export const postUser = (postData: any) => async (dispatch: AppDispatch) => {
  try {
    const users = await postUserAPI(postData);
    dispatch(addUser(users))

  } catch (error: any) {
    console.log(error)
  }
}

const userSlice = createSlice({
  name: 'users',
  initialState: initialUserState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },

    fetchError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    addUser: (state, action) => {
      state.data.push(action.payload);
    },

    updateUser: (state, action) => {
      state.data = state.data.map((user) =>
        user.id === action.payload.id ? action.payload : user
      )
    },

    deleteUser: (state, action) => {
      state.data = state.data.filter((user: User) => user.id !== action.payload)
    },
  }
});

export const { addUser, updateUser, deleteUser, fetchError, fetchStart, fetchSuccess } = userSlice.actions;
export default userSlice.reducer;
