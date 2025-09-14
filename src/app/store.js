import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { provincesReducer } from "./reducers/provinces";
import { localitesReducer } from "./reducers/localites";
import { zonesReducer } from "./reducers/zones";
import { documentsReducer } from "./reducers/documents";

const store = configureStore({
  reducer: {
    user: userReducer,
    provinces: provincesReducer,
    localites: localitesReducer,
    zones: zonesReducer,
    documents: documentsReducer,
  },
});
export default store;
