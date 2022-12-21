import {
  Action,
  autoBatchEnhancer,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { api } from "../api";
import appReducer, { addAlert } from "./appSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    api.middleware,
    (store) => (next) => (action) => {
      if (["api/executeQuery/rejected"].includes(action.type)) {
        store.dispatch(
          addAlert({
            id: action.meta.requestId,
            key: "An API error occured, please try again later...",
          })
        );
      }

      next(action);
    },
  ],
  enhancers: (existingEnhancers) => {
    // Add the autobatch enhancer to the store setup
    return existingEnhancers.concat(autoBatchEnhancer());
  },
});

(window as any).reduxStore = store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
