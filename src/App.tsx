import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import UserForm from './features/Form/UserForm';
import createMockServer from './mock-server';

createMockServer();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <UserForm />
    </Provider>
  );
};

export default App;
