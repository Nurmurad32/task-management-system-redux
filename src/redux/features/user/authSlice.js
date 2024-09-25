// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseAPI from '../../../components/api/baseAPI/baseApi';

// Set the base URL for Axios
axios.defaults.baseURL = baseAPI; // Update if different

// Get token from localStorage if available
const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

// Initial State
const initialState = {
  token: token,
  isAuthenticated: token ? true : false,
  loading: false,
  user: null,
  error: null,
};

// Async Thunks

// Register User
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/signup', { formData });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.error || 'Registration failed.');
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/login', { formData });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.error || 'Login failed.');
    }
  }
);

// Load User Profile
export const loadUserProfile = createAsyncThunk(
  'auth/loadUserProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
        return rejectWithValue('No token found.');
      }

      const response = await axios.get('/profile');
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response.data.error || 'Failed to load user.');
    }
  }
);

// Update User Profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (updateData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
        return rejectWithValue('No token found.');
      }

      const response = await axios.patch('/profile', updateData);
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response.data.error || 'Failed to update profile.');
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/logout');
      return;
    } catch (err) {
      return rejectWithValue(err.response.data.error || 'Logout failed.');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // You can add synchronous actions here if needed
  },
  extraReducers: (builder) => {
    // Register User
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Login User
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Load User Profile
    builder.addCase(loadUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(loadUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
    });

    // Update User Profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Logout User
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem('token');
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
