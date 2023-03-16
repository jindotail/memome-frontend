import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storageSession from 'redux-persist/lib/storage/session';
import themeReducer from './theme';

const persistConfig = {
  key: "react",
  storage: storageSession,
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

