import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documents: {
    statuts: null,
    reglements: null,
    personnalite: null,
    organigramme: null,
    rapports: null,
    etatsFinanciers: null,
    pvAssemblee: null,
  },
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDocument: (state, action) => {
      const { documentType, file } = action.payload;
      // Le fichier est déjà un objet sérialisable
      state.documents[documentType] = file;
    },
    removeDocument: (state, action) => {
      const { documentType } = action.payload;
      state.documents[documentType] = null;
    },
    clearAllDocuments: (state) => {
      state.documents = {
        statuts: null,
        reglements: null,
        personnalite: null,
        organigramme: null,
        rapports: null,
        etatsFinanciers: null,
        pvAssemblee: null,
      };
    },
  },
});

export const { setDocument, removeDocument, clearAllDocuments } =
  documentsSlice.actions;
export const documentsReducer = documentsSlice.reducer;

// Sélecteurs
export const getAllDocuments = (state) => state.documents.documents;
export const getDocumentByType = (documentType) => (state) =>
  state.documents.documents[documentType];
