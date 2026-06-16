import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import profileReducer from './profile/profileSlice';
import settingsReducer from './settings/settingsSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  profile: profileReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
