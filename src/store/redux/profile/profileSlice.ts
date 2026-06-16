import { createSlice } from '@reduxjs/toolkit';
import type { Profile } from '../../../types/Profile';

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
