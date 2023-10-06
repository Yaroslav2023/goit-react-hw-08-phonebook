import { createSlice } from '@reduxjs/toolkit';

const initialStateFilter = {
  filter: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialStateFilter,
  reducers: {
    filterChanges(state, { payload: value }) {
      state.filter = value;
    },
  },
});

export const { filterChanges } = filterSlice.actions;
export default filterSlice.reducer;
