import { configureStore, combineReducers } from "@reduxjs/toolkit";
import playerReducer from "./playerDetailsSlice";
import gameReducer from "./gameSlice";
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
  withReduxStateSync,
} from "redux-state-sync";

const stateSyncMiddleware = createStateSyncMiddleware();

export const rootReducer = combineReducers({
  player: playerReducer,
  game: gameReducer,
});

const reducer = withReduxStateSync(rootReducer);

export const store = configureStore({
  reducer,
  middleware: [stateSyncMiddleware],
  devTools: process.env.NODE_ENV === 'development'
});
initStateWithPrevTab(store);

export type RootState = ReturnType<typeof rootReducer>;
