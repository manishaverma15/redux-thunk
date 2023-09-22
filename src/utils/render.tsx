import { ReactElement } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { configureStore, PreloadedState, EnhancedStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import userReducer from '../features/Form/userSlice';
import { RootState } from '../store';

interface ExtendedRenderOptions extends RenderOptions {
  preloadedState?: PreloadedState<RootState>;
  store?: EnhancedStore;
}

interface WrapperProps {
  children?: React.ReactNode;
}

function render(
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: { users: userReducer }, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: WrapperProps) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export default render;