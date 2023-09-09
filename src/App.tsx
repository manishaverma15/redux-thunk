import React from 'react';
import { Provider } from 'react-redux';
import UserForm from './Features/Form/UserForm';
import { store } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <UserForm />
    </Provider>
  );
};

export default App;
