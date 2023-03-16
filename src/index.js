import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import axios from "axios";
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.withCredentials = true;

root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </PersistGate>
    </Provider>
);


