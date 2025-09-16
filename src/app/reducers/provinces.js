import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { axios } from "../../config/axios";

// Adapter pour gérer les provinces
const provincesAdapter = createEntityAdapter({
  selectId: (province) => province.pro_id,
});

const initialState = provincesAdapter.getInitialState({
  loading: false,
  error: null,
  selectedProvince: null,
  selectedProvinces: [],
});

// Thunk pour récupérer les provinces
export const getProvinces = createAsyncThunk("provinces/get", async () => {
  const res = await axios.get("/provinces");
  return res.data;
});

const provincesSlice = createSlice({
  name: "provinces",
  initialState,
  reducers: {
    clearProvinces: (state) => {
      state.selectedProvince = null;
      state.selectedProvinces = [];
      // Réinitialiser également l'état de l'adapter si nécessaire
      provincesAdapter.removeAll(state);
    },
    setSelectedProvince: (state, action) => {
      state.selectedProvince = action.payload;
    },
    setSelectedProvinces: (state, action) => {
      // Remplace le tableau complet des provinces sélectionnées
      state.selectedProvinces = action.payload; // [{ pro_id, pro_designation }]
    },
    toggleSelectedProvince: (state, action) => {
      const provinceToAddOrRemove = action.payload;
      const existingIndex = state.selectedProvinces.findIndex(
        (p) => p.pro_id === provinceToAddOrRemove.pro_id
      );

      if (existingIndex >= 0) {
        state.selectedProvinces = state.selectedProvinces.filter(
          (p) => p.pro_id !== provinceToAddOrRemove.pro_id
        );
      } else {
        state.selectedProvinces.push(provinceToAddOrRemove);
      }
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

export const {
  clearProvinces,
  setSelectedProvince,
  setSelectedProvinces,
  toggleSelectedProvince,
} = provincesSlice.actions;
export const provincesReducer = provincesSlice.reducer;

export const { selectAll: selectAllProvinces, selectById: selectProvinceById } =
  provincesAdapter.getSelectors((state) => state.provinces);

export const getProvincesLoading = (state) => state.provinces.loading;
export const getProvincesError = (state) => state.provinces.error;
export const getSelectedProvince = (state) => state.provinces.selectedProvince;
export const getSelectedProvinces = (state) =>
  state.provinces.selectedProvinces;
