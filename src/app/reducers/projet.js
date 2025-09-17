import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  protectedAxios, } from "../../config/axios";

const initialState = {
  projets: null,
  loading: false,
  error: null,
};

export const sendProjet = createAsyncThunk("projet/register", async (data, { rejectWithValue }) => {
  try {
    // Utiliser l'instance configurée pour l'envoi de fichiers (FormData)
    const res = await protectedAxios.post("/projets", data);
    return res.data;
  } catch (error) {
    const response = error.response;
    if (response) {
      const message = response.data?.message || "Une erreur est survenue lors de la soumission";
      // Propager le message backend à l'UI
      return rejectWithValue({ status: "failed", message });
    }
    return rejectWithValue({ status: "failed", message: error.message || "Erreur réseau" });
  }
});

export const { reducer: projetReducer, actions } = createSlice({
  name: "projet",
  initialState,
  extraReducers: (builder) => {
    
  },
});

export const selectAllProjets = (state) => state.projet.projets;
export const getLoadingProjet = (state) => state.projet.loading;
export const getErrorProjet = (state) => state.projet.error;
