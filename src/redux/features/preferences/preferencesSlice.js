import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterBy: {
    priority: 'All',
    status: 'All',
  },
  sortBy: '',
  order: 'asc', // default order
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setFilterBy: (state, action) => {
      state.filterBy = { ...state.filterBy, ...action.payload };
    },
    setSortBy: (state, action) => {
      const { sortBy, order } = action.payload || {};
      if (sortBy !== undefined) {
        state.sortBy = sortBy;
      }
      if (order !== undefined) {
        state.order = order;
      }
    },
  },
});

export const { setFilterBy, setSortBy } = preferencesSlice.actions;

export default preferencesSlice.reducer;
