import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { createTheme, ThemeProvider } from '@mui/material';

const options = {
  timeout: 4000,
  position: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE,
};
const theme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AlertProvider>
  </Provider>
);
