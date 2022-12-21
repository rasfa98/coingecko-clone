import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AppState {
  alerts: any;
}

export const initialState: AppState = {
  alerts: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<any>) => {
      state.alerts.push(action.payload);
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(
        (alert: any) => alert.id !== action.payload
      );
    },
  },
});

/**
 * Actions
 */
export const { addAlert, removeAlert } = appSlice.actions;

/**
 * Selectors
 */
export const selectAlerts = (state: RootState) => state.app.alerts;

export default appSlice.reducer;
