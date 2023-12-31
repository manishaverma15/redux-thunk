import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/Form/userSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    users: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
}, );

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
