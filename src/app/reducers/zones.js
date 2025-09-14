import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const zonesAdapter = createEntityAdapter({
  selectId: (zone) => zone.pro_id,
});

const initialState = zonesAdapter.getInitialState({
  selectedZones: [],
});

const zonesSlice = createSlice({
  name: "zones",
  initialState,
  reducers: {
    toggleZone: (state, action) => {
      const province = action.payload;
      const exists = state.selectedZones.some(
        (z) => z.pro_id === province.pro_id
      );

      if (exists) {
        state.selectedZones = state.selectedZones.filter(
          (z) => z.pro_id !== province.pro_id
        );
      } else {
        state.selectedZones.push(province);
      }
    },
    setSelectedZones: (state, action) => {
      state.selectedZones = action.payload;
    },
    clearZones: (state) => {
      state.selectedZones = [];
    },
  },
});

export const { toggleZone, setSelectedZones, clearZones } = zonesSlice.actions;
export const zonesReducer = zonesSlice.reducer;

export const {
  selectAll: selectAllZones,
  selectById: selectZoneById,
  selectIds: selectZoneIds,
} = zonesAdapter.getSelectors((state) => state.zones);

export const getSelectedZones = (state) => state.zones.selectedZones;
