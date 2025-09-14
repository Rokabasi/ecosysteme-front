import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk pour récupérer les domaines depuis l'API
export const fetchDomaines = createAsyncThunk(
  'domaines/fetchDomaines',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3009/domaines');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Erreur lors du chargement des domaines');
    }
  }
);

const initialState = {
  domaines: [],
  loading: false,
  error: null,
};

const domainesSlice = createSlice({
  name: 'domaines',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDomaines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDomaines.fulfilled, (state, action) => {
        state.loading = false;
        state.domaines = action.payload;
      })
      .addCase(fetchDomaines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Sélecteurs
export const selectAllDomaines = (state) => state.domaines.domaines.map(d => d.dom_designation);
export const selectDomainesLoading = (state) => state.domaines.loading;
export const selectDomainesError = (state) => state.domaines.error;

export const selectDomainesWithDetails = (state) => state.domaines.domaines;

export default domainesSlice.reducer;
