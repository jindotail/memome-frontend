import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import themeReducer from './theme';

const persistConfig = {
  key: "react",
  storage,
  whitelist: ['theme']
};

export const rootReducer = combineReducers({
  theme: themeReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

