import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios, protectedAxios } from "../../config/axios";

const initialState = {
  candidatures: null,
  loading: false,
  error: null,
};

export const sendCandidature = createAsyncThunk("structure/register", async (data) => {
  try {
    const res = await axios.post("/register", data);
    return res.data;
  } catch (error) {
    const response = error.response;
    if (response.status === 401) {
      return {
        status: "failed",
        message: response.data.message,
      };
    }
    if (response.status === 409) {
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
  },
});

export const selectAllCandidature = (state) => state.candidature.candidatures;
export const getLoadingCandidature = (state) => state.candidature.loading;
export const getErrorCandidature = (state) => state.candidature.error;
