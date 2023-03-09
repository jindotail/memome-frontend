import { configureStore } from '@reduxjs/toolkit';
import themeRedeucer from './theme';

const store = configureStore({
    reducer: {
      theme: themeRedeucer
    }
});

export default store;
