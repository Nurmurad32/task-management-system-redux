import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseAPI from '../../../components/api/baseAPI/baseApi';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { preferences } = getState();
      const { filterBy, sortBy, order } = preferences;

      // Build query parameters
      const params = {};
      if (filterBy.priority && filterBy.priority !== 'All') {
        params.priority = filterBy.priority;
      }
      if (filterBy.status && filterBy.status !== 'All') {
        params.status = filterBy.status;
      }
      if (sortBy) {
        params.sortBy = sortBy;
        params.order = order;
      }

      const response = await axios.get(`${baseAPI}/tasks`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSingleTask = createAsyncThunk('tasks/fetchSingleTask',
  async (id) => {
    const response = await axios.get(`${baseAPI}/tasks/${id}`);
    return response.data;
  });

export const createTask = createAsyncThunk('tasks/createTask',
  async (task) => {
    const response = await axios.post(`${baseAPI}/tasks`, task);
    // console.log(response.data);
    return response.data;
  })

export const updateTask = createAsyncThunk('tasks/updateTask',
  async ({ id, task }) => {
    const response = await axios.patch(`${baseAPI}/tasks/${id}`, task);
    // console.log(id, task)
    return response.data;
  })

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await axios.delete(`${baseAPI}/tasks/${id}`);
  return id;
});


const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState: {
    items: [],
    selectedTask: null, 
    resStatus: 'idle',
    isLoading: true,
    success: null,
    error: null,
  },
  reducers: {
    clearSelectedTask: (state) => {
      state.selectedTask = null;
    },
    clearStatus: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.resStatus = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, { payload }) => {
        
        state.resStatus = 'succeeded';
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        
        state.resStatus = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch Single tasks
      .addCase(fetchSingleTask.pending, (state) => {
        state.resStatus = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchSingleTask.fulfilled, (state, { payload }) => {
        
        state.resStatus = 'succeeded';
        state.isLoading = false;
        state.selectedTask = payload;
      })
      .addCase(fetchSingleTask.rejected, (state, action) => {
        state.resStatus = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Add task
      .addCase(createTask.pending, (state) => {
        state.resStatus = 'loading';
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        
        state.resStatus = 'succeeded';
        state.isLoading = false;
        state.items.push(payload);
        state.success = "Task Created Successfully"
      })
      .addCase(createTask.rejected, (state, action) => {
        state.resStatus = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.resStatus = 'loading';
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        
        state.resStatus = 'succeeded';
        state.isLoading = false;
        const index = state.items.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.success = "Task Updated Successfully"
        state.selectedTask = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.resStatus = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.resStatus = 'loading';
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.resStatus = 'succeeded';
        state.isLoading = false;
        state.items = state.items.filter(task => task._id !== action.payload);
        state.success = "Task Deleted Successfully"
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.resStatus = 'failed';
        state.isLoading = false;
        state.error = action.error.message;
      })
  }
});

export const { clearSelectedTask, clearStatus } = tasksSlice.actions;

export default tasksSlice.reducer;
