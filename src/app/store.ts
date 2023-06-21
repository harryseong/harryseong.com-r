import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appConfigReducer from '../components/shared/app-config/AppConfigSlice'
import authReducer from '../components/shared/auth/authSlice';
import musicReducer from '../components/pages/music/musicSlice';
import placesReducer from '../components/pages/places/placesSlice';

export const store = configureStore({
  reducer: {
    appConfig: appConfigReducer,
    auth: authReducer,
    music: musicReducer,
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
