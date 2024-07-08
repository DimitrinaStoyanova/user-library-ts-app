import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import navigationSlice from './navigationSlice';
import userApi, { userApiMiddleware } from './api/userApi';
import userSlice from './userSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    userApi?.reducerPath,
    navigationSlice.name
  ]
};

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  navigationSlice: navigationSlice?.reducer,
  userSlice: userSlice?.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const middleware = (getDefaultMiddleware: any) => {
  const defaultMiddleware = getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  });
  return defaultMiddleware
  .concat(userApiMiddleware)
};

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
