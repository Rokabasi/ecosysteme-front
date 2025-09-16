import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios, protectedAxios, protectedSendFileAxios } from "../../config/axios";

const initialState = {
  dossiers: null,
  loading: false,
  error: null,
  dossierDetail:null
};


export const getDossiers = createAsyncThunk("dossiers-get", async (direction) => {
    console.log(direction);
    
  try {
    const res = await protectedAxios.get("/dossiers",{
        params: { direction }
      });
    return res.data;
  } catch (error) {
    const response = error.response;
    if (response.status === 404) {
      return {
        status: "failed",
        message: response.data.message,
      };
    }
    return Promise.reject(error);
  }
});

export const getDossierDetails = createAsyncThunk("dossiers-get-detail", async (id) => {
  try {
    const res = await protectedAxios.get(`/dossiers/${id}`);
    return res.data;
  } catch (error) {
    const response = error.response;
    if (response.status === 404) {
      return {
        status: "failed",
        message: response.data.message,
      };
    }
    return Promise.reject(error);
  }
});

export const { reducer: dossierReducer, actions } = createSlice({
  name: "dossier",
  initialState,
  extraReducers: (builder) => {


    builder.addCase(getDossiers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getDossiers.fulfilled, (state,action) => {
      state.dossiers = action.payload;
      state.loading = false;
    });

    builder.addCase(getDossiers.rejected, (state) => {
      state.loading = false;
      state.error = true
    });

    builder.addCase(getDossierDetails.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getDossierDetails.fulfilled, (state,action) => {
      state.loading = false;
      state.dossierDetail = action.payload;
    });

    builder.addCase(getDossierDetails.rejected, (state) => {
      state.loading = false;
    });

  },
});

export const selectAllDossiers = (state) => state.dossier.dossiers;
export const getLoadingDossier = (state) => state.dossier.loading;
export const getErrorDossier = (state) => state.dossier.error;
export const selectDossierDetails = (state) => state.dossier.dossierDetail;
