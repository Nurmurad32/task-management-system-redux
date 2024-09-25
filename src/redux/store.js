import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './features/tasks/tasksSlice';
import userSlice from './features/user/userSlice';
import authReducer from './features/user/authSlice';
import preferencesReducer from './features/preferences/preferencesSlice'

const store = configureStore({
  reducer: {
    tasksSlice: tasksSlice,
    preferences: preferencesReducer,
    userSlice: userSlice,
    auth: authReducer,
  },
});

export default store;
