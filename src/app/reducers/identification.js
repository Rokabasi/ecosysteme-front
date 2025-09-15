import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    denomination: "",
    sigle: "",
    anneeCreation: "",
    adresse: "",
    nomFonction: "",
    fonction: "",
    telephone: "",
    email: "",
    site: "",
    mission: "",
    nombreEmployes: "",
    domaines: "",
    resultats: "",
  },
};

const identificationSlice = createSlice({
  name: "identification",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    clearFormData: (state) => {
      state.formData = {
        denomination: "",
        sigle: "",
        anneeCreation: "",
        adresse: "",
        nomFonction: "",
        fonction: "",
        telephone: "",
        email: "",
        site: "",
        mission: "",
        nombreEmployes: "",
        domaines: "",
        resultats: "",
      };
    },
  },
});

export const { updateField, setFormData, clearFormData } =
  identificationSlice.actions;
export const identificationReducer = identificationSlice.reducer;

// Sélecteurs
export const getIdentificationFormData = (state) =>
  state.identification.formData;
export const getIdentificationField = (field) => (state) =>
  state.identification.formData[field];
