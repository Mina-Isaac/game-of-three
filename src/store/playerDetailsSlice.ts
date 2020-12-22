import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Player {
  type: "human" | "cpu";
  name: string;
}
export interface PlayerState {
  player1: undefined | Player;
  player2: undefined | Player;
}

export const initialState: PlayerState = {
  player1: undefined,
  player2: undefined,
};

export const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    initializePlayer: (
      state,
      action: PayloadAction<Player & { playerKey: keyof PlayerState }>
    ) => {
      const { playerKey, ...details } = action.payload;
      state[playerKey] = { ...details };
    },
  },
});

export const { initializePlayer } = playerSlice.actions;

// Selectors
export const selectPlayer1 = (state: RootState) => state.player.player1;
export const selectPlayer2 = (state: RootState) => state.player.player2;

export default playerSlice.reducer;
