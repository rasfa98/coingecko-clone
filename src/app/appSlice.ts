import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AppState {
  alerts: any;
  currency: string;
}

export const initialState: AppState = {
  alerts: [],
  currency: "usd",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<{ id: string; key: string }>) => {
      state.alerts.push(action.payload);
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(
        (alert: any) => alert.id !== action.payload
      );
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
  },
});

/**
 * Actions
 */
export const { addAlert, removeAlert, setCurrency } = appSlice.actions;

/**
 * Selectors
 */
export const selectAlerts = (state: RootState) => state.app.alerts;
export const selectCurrency = (state: RootState) => state.app.currency;

export default appSlice.reducer;
