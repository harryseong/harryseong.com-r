import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import appConfigReducer from '../components/app-config/AppConfigSlice'
import counterReducer from '../components/counter/counterSlice';
import placesReducer from '../components/places/placesSlice';

export const store = configureStore({
  reducer: {
    appConfig: appConfigReducer,
    counter: counterReducer,
    places: placesReducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
