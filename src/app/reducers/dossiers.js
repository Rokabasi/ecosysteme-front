import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios, protectedAxios, protectedSendFileAxios } from "../../config/axios";

const initialState = {
  dossiers: null,
  loading: false,
  error: null,
  dossierDetail:null
};


export const getDossiers = createAsyncThunk("dossiers-get", async (direction) => {
    
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

export const getAuditDossiers = createAsyncThunk("dossiers-audit-get", async (direction) => {
    
  try {
    const res = await protectedAxios.get("/dossiers/audit");
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

export const getJuridiqueDossiers = createAsyncThunk("dossiers-juridique-get", async (direction) => {
    
  try {
    const res = await protectedAxios.get("/dossiers/juridique");
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

export const getFinanceDossiers = createAsyncThunk("dossiers-finance-get", async (direction) => {
    
  try {
    const res = await protectedAxios.get("/dossiers/finance");
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

export const rejetedDossier = createAsyncThunk("dossiers-rejeted",
  async (data, { rejectWithValue }) => {
    try {
      const res = await protectedAxios.patch("/dossiers/rejet", data);
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

export const validatedDossier = createAsyncThunk("dossiers-validated",
  async (data, { rejectWithValue }) => {
    try {
      const res = await protectedAxios.patch("/dossiers/validation", data);
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

export const niveauRisqueDossier = createAsyncThunk("dossiers-risque",
  async (data, { rejectWithValue }) => {
    try {
      const res = await protectedAxios.patch("/dossiers/duediligence", data);
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

    builder.addCase(getAuditDossiers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAuditDossiers.fulfilled, (state,action) => {
      state.dossiers = action.payload;
      state.loading = false;
    });

    builder.addCase(getAuditDossiers.rejected, (state) => {
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

    builder.addCase(getJuridiqueDossiers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getJuridiqueDossiers.fulfilled, (state,action) => {
      state.loading = false;
      state.dossiers = action.payload;
    });

    builder.addCase(getJuridiqueDossiers.rejected, (state) => {
      state.loading = false;
    });

     builder.addCase(getFinanceDossiers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getFinanceDossiers.fulfilled, (state,action) => {
      state.loading = false;
      state.dossiers = action.payload;
    });

    builder.addCase(getFinanceDossiers.rejected, (state) => {
      state.loading = false;
    });

  },
});

export const selectAllDossiers = (state) => state.dossier.dossiers;
export const getLoadingDossier = (state) => state.dossier.loading;
export const getErrorDossier = (state) => state.dossier.error;
export const selectDossierDetails = (state) => state.dossier.dossierDetail;
