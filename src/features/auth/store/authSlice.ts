import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from '@/features/auth/services/authService';
import { storageUtils } from '@/utils/storageUtils';
import type { AuthUser } from '@/types/User';
import type { AuthSession, AuthState, LoginPayload, SignupPayload } from '@/features/auth/types';

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const toAuthSession = (authUser: AuthUser): AuthSession => {
  const { token, refreshToken, ...user } = authUser;
  return {
    user,
    token,
    refreshToken: refreshToken ?? null,
  };
};

const persistAuthSession = async (session: AuthSession) => {
  await storageUtils.saveAuthToken(session.token);
  if (session.refreshToken) {
    await storageUtils.saveRefreshToken(session.refreshToken);
  }
  await storageUtils.saveUserData(session.user);
};

export const loginUser = createAsyncThunk<AuthSession, LoginPayload>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    const response = await AuthService.login(credentials);

    if (!response.success) {
      return rejectWithValue(response.message ?? 'Login failed');
    }

    const session = toAuthSession(response.data);
    await persistAuthSession(session);
    return session;
  },
);

export const signupUser = createAsyncThunk<AuthSession, SignupPayload>(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    const response = await AuthService.signup(payload);

    if (!response.success) {
      return rejectWithValue(response.message ?? 'Signup failed');
    }

    const session = toAuthSession(response.data);
    await persistAuthSession(session);
    return session;
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
    setSession: (state, action: PayloadAction<AuthSession>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken ?? null;
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
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken ?? null;
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
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken ?? null;
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
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearAuthError, setSession } = authSlice.actions;
export default authSlice.reducer;
