import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from '../services/authService';
import { storageUtils } from '../../../utils/storageUtils';
import type { AuthUser } from '../../../types/User';
import type { AuthState, LoginPayload, SignupPayload } from '../types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const persistAuthUser = async (user: AuthUser) => {
  await storageUtils.saveAuthToken(user.token);
  await storageUtils.saveUserData(user);
};

export const loginUser = createAsyncThunk<AuthUser, LoginPayload>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    const response = await AuthService.login(credentials);

    if (!response.success) {
      return rejectWithValue(response.message ?? 'Login failed');
    }

    await persistAuthUser(response.data);
    return response.data;
  },
);

export const signupUser = createAsyncThunk<AuthUser, SignupPayload>(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    const response = await AuthService.signup(payload);

    if (!response.success) {
      return rejectWithValue(response.message ?? 'Signup failed');
    }

    await persistAuthUser(response.data);
    return response.data;
  },
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    await AuthService.logout();
  } finally {
    await storageUtils.clearAuthData();
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === 'string'
          ? action.payload
          : action.error.message ?? 'Login failed';
      })
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === 'string'
          ? action.payload
          : action.error.message ?? 'Signup failed';
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearAuthError, setUser } = authSlice.actions;
export default authSlice.reducer;
