import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const localitesSlice = createSlice({
  name: "localites",
  initialState,
  reducers: {
    setLocalite: (state, action) => {
      const { pro_id, value } = action.payload;
      state.data[pro_id] = value;
    },
    setLocalites: (state, action) => {
      state.data = action.payload;
    },
    clearLocalites: (state) => {
      state.data = {};
    },
  },
});

export const { setLocalite, setLocalites, clearLocalites } =
  localitesSlice.actions;
export const localitesReducer = localitesSlice.reducer;
export const getLocalites = (state) => state.localites.data;
