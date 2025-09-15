import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { provincesReducer } from "./reducers/provinces";
import { localitesReducer } from "./reducers/localites";
import { zonesReducer } from "./reducers/zones";
import { documentsReducer } from "./reducers/documents";
import { identificationReducer } from "./reducers/identification";
import { questionsReducer } from "./reducers/questions";
import domainesReducer from "./reducers/domaines";
import { candidatureReducer } from "./reducers/candidatures";

const store = configureStore({
  reducer: {
    user: userReducer,
    provinces: provincesReducer,
    localites: localitesReducer,
    zones: zonesReducer,
    documents: documentsReducer,
    identification: identificationReducer,
    questions: questionsReducer,
    domaines: domainesReducer,
    candidature:candidatureReducer,
  },
});
export default store;
