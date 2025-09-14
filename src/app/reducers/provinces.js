import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const provincesAdapter = createEntityAdapter({
  selectId: (province) => province.pro_id,
});

const initialState = provincesAdapter.getInitialState({
  loading: false,
  error: null,
  selectedProvince: null,
});

export const getProvinces = createAsyncThunk("provinces/get", async () => {
  const res = await axios.get("http://localhost:3009/provinces");
  return res.data;
});

const provincesSlice = createSlice({
  name: "provinces",
  initialState,
  reducers: {
    setSelectedProvince: (state, action) => {
      state.selectedProvince = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProvinces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.loading = false;
        provincesAdapter.setAll(state, action.payload);
      })
      .addCase(getProvinces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement";
      });
  },
});

export const { setSelectedProvince } = provincesSlice.actions;
export const registerReducer = provincesSlice.reducer;

export const {
  selectAll: selectAllProvinces,
  selectById: selectProvinceById,
  selectIds: selectProvinceIds,
} = provincesAdapter.getSelectors((state) => state.provinces);

export const getProvincesLoading = (state) => state.provinces.loading;
export const getProvincesError = (state) => state.provinces.error;
export const getSelectedProvince = (state) => state.provinces.selectedProvince;
