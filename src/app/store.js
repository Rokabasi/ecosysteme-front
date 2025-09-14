import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { registerReducer } from "./reducers/provinces";

const store = configureStore({
  reducer: {
    user: userReducer,
    provinces: registerReducer,
  },
});
export default store;
