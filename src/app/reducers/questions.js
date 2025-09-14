import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  answers: {
    priseEnCharge: "",
    occasion: "",
    associationVictimes: "",
    infosVictimes: "",
    collaborationFonarev: "",
    compteBancaire: "",
  },
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    updateAnswer: (state, action) => {
      const { question, answer } = action.payload;
      state.answers[question] = answer;
    },
    setAnswers: (state, action) => {
      state.answers = { ...state.answers, ...action.payload };
    },
    clearAnswers: (state) => {
      state.answers = {
        priseEnCharge: "",
        occasion: "",
        associationVictimes: "",
        infosVictimes: "",
        collaborationFonarev: "",
        compteBancaire: "",
      };
    },
  },
});

export const { updateAnswer, setAnswers, clearAnswers } =
  questionsSlice.actions;
export const questionsReducer = questionsSlice.reducer;

// Sélecteurs
export const getAllAnswers = (state) => state.questions.answers;
export const getAnswer = (question) => (state) =>
  state.questions.answers[question];
