import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appConfigReducer from '../components/shared/app-config/AppConfigSlice'
import counterReducer from '../components/pages/counter/counterSlice';
import placesReducer from '../components/pages/places/placesSlice';
import authReducer from '../components/shared/auth/authSlice';

export const store = configureStore({
  reducer: {
    appConfig: appConfigReducer,
    auth: authReducer,
    counter: counterReducer,
    places: placesReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
