import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    filterChanges(state, { payload: value }) {
      state.filter = value;
    },
  },
});

export const { filterChanges } = filterSlice.actions;
export default filterSlice.reducer;
