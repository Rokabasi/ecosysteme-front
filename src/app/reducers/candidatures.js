import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios, protectedAxios, protectedSendFileAxios } from "../../config/axios";

const initialState = {
  candidatures: null,
  loading: false,
  error: null,
};

export const sendCandidature = createAsyncThunk("structure/register", async (data, { rejectWithValue }) => {
  try {
    // Utiliser l'instance configurée pour l'envoi de fichiers (FormData)
    const res = await axios.post("/register", data);
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

export const getCandidatures = createAsyncThunk("candidatures-get", async () => {
  try {
    const res = await protectedAxios.get("/candidatures");
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

export const { reducer: candidatureReducer, actions } = createSlice({
  name: "candidature",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(sendCandidature.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(sendCandidature.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(sendCandidature.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getCandidatures.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getCandidatures.fulfilled, (state,action) => {
      state.loading = false;
      state.candidatures = action.payload;
    });

    builder.addCase(getCandidatures.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const selectAllCandidatures = (state) => state.candidature.candidatures;
export const getLoadingCandidature = (state) => state.candidature.loading;
export const getErrorCandidature = (state) => state.candidature.error;
