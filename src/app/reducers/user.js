import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios, protectedAxios } from "../../config/axios";

const initialState = {
  user: null,
  loading: false,
  error: null,
  directeur: null,
};

export const loginUser = createAsyncThunk("user/login", async (data) => {
  try {
    const res = await axios.post("/users/login", data);
    return res.data;
  } catch (error) {
    const response = error.response;
    if (response.status === 404) {
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

export const resetLogin = createAsyncThunk("user-send-data", async (data) => {
  try {
    const res = await axios.post("/users/request-reset", data);
    return res.data;
  } catch (error) {
    const response = error.response;
    if (response.status === 404) {
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

export const getUser = createAsyncThunk("users-get", async () => {
  try {
    const res = await protectedAxios.get("/users");
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

export const sendUser = createAsyncThunk("users-get", async (data) => {
  try {
    const res = await protectedAxios.post("/users", data);
    return res.data;
  } catch (error) {
    console.log(error);

    const response = error.response;
    if (response.status === 404) {
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
    return Promise.reject(error);
  }
});

export const logout = createAsyncThunk("users-logout", async () => {
  try {
    const res = await protectedAxios.patch("/users/logout");
    return res.data;
  } catch (error) {
    const response = error.response;
    if (response.status === 404) {
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

export const userUpdate = createAsyncThunk(
  "users-update",
  async ({ userData, agentData, id }) => {
    try {
      const res = await protectedAxios.patch(`/users/${id}`, {
        userData,
        agentData,
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
      if (response.status === 409) {
        return {
          status: "failed",
          message: response.data.message,
        };
      }
      return Promise.reject(error);
    }
  }
);

export const deleteUser = createAsyncThunk("users-delete", async (id) => {
  try {
    const res = await protectedAxios.delete(`/users/${id}`);
    return res.data;
  } catch (error) {
    const response = error.response;
    if (response.status === 404) {
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

export const resetPassword = createAsyncThunk(
  "users-reset-password",
  async (data) => {
    try {
      const res = await protectedAxios.patch("/users/password", data);
      return res.data;
    } catch (error) {
      const response = error.response;
      if (response.status === 404) {
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
  }
);

export const changePassword = createAsyncThunk(
  "users-change-password",
  async (data) => {
    try {
      const res = await protectedAxios.patch("/users/password/upreset", data);
      return res.data;
    } catch (error) {
      const response = error.response;
      if (response.status === 404) {
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
  }
);

export const resetPasswordByAdmin = createAsyncThunk(
  "admin-reset-password",
  async (data) => {
    try {
      const res = await protectedAxios.patch(`/users/reset/password/${data}`);
      return res.data;
    } catch (error) {
      const response = error.response;
      if (response.status === 404) {
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
  }
);

export const blockUserByAdmin = createAsyncThunk(
  "admin-block",
  async (data) => {
    try {
      const res = await protectedAxios.patch(`/users/block/${data}`);
      return res.data;
    } catch (error) {
      const response = error.response;
      if (response.status === 404) {
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
  }
);

export const { reducer: userReducer, actions } = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loginUser.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.users;
    });

    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.users;
    });

    builder.addCase(resetLogin.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(resetLogin.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(userUpdate.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userUpdate.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export const selectAlluser = (state) => state.user.user;
export const selectDirector = (state) => state.user.directeur;
export const getLoadingUser = (state) => state.user.loading;
export const getError = (state) => state.user.error;
