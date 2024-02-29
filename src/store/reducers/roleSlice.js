import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role : []
};

const role = createSlice({
  name: 'role',
  initialState,
  reducers: {
    addRole: (state, action) => {
      state.role = action.payload;
    },
    removeRole: (state) => {
      state.role = []
    },
  },
});

export const { addRole, removerole } = role.actions;
export const selectRoles = (state) => state.role.role;
export default role.reducer;
