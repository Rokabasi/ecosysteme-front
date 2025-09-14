import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localites: {}, // { provinceId: "localité1, localité2, ..." }
};

const localitesSlice = createSlice({
  name: "localites",
  initialState,
  reducers: {
    setLocalites: (state, action) => {
      // Remplace toutes les localités
      state.localites = action.payload;
    },
    updateLocalites: (state, action) => {
      // Met à jour les localités pour une province spécifique
      const { provinceId, value } = action.payload;
      state.localites[provinceId] = value;
    },
    clearLocalites: (state) => {
      // Vide toutes les localités
      state.localites = {};
    },
  },
});

export const { setLocalites, updateLocalites, clearLocalites } =
  localitesSlice.actions;
export const localitesReducer = localitesSlice.reducer;

// Sélecteurs
export const getAllLocalites = (state) => state.localites.localites;
export const getLocalitesByProvince = (provinceId) => (state) =>
  state.localites.localites[provinceId] || "";
