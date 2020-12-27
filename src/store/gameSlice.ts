import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerState } from "./playerDetailsSlice";
import { RootState } from "./store";

interface GameState {
  startingNumber: number | undefined;
  baseNumber: number | undefined;
  validMove: -1 | 0 | 1 | undefined;
  vs: "human" | "cpu" | undefined;
  lastPlayer: keyof PlayerState;
  canPlay: { player1: boolean; player2: boolean };
  winner: keyof PlayerState | undefined;
}

export const initialState: GameState = {
  startingNumber: undefined,
  baseNumber: undefined,
  validMove: undefined,
  vs: undefined,
  lastPlayer: "player1",
  canPlay: { player1: false, player2: true },
  winner: undefined,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initializeGame: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.startingNumber = payload;
      state.baseNumber = payload;
      state.lastPlayer = "player1";
      state.canPlay = { player1: false, player2: true };
      if (payload % 3 === 0) state.validMove = 0;
      else if (payload % 3 === 1) state.validMove = -1;
      else state.validMove = 1;
    },
    playNextMove: (state) => {
      const newBase = (state.baseNumber! + state.validMove!) / 3;
      state.baseNumber = newBase;
      if (newBase % 3 === 0) state.validMove = 0;
      else if (newBase % 3 === 1) state.validMove = -1;
      else state.validMove = 1;
      const { player1, player2 } = state.canPlay;
      state.canPlay = { player1: !player1, player2: !player2 };
      state.lastPlayer =
        (state.lastPlayer === "player1" && "player2") || "player1";
      if (newBase === 1) state.winner = state.lastPlayer;
    },
    setVs: (state, action: PayloadAction<"human" | "cpu" | undefined>) => {
      state.vs = action.payload;
    },
    startNewGame: (state) => {
      state.baseNumber = undefined;
      state.validMove = undefined;
      state.winner = undefined;
    },
  },
});

export const {
  initializeGame,
  playNextMove,
  setVs,
  startNewGame,
} = gameSlice.actions;

// Selectors
export const selectStartingNumber = (state: RootState) =>
  state.game.startingNumber;
export const selectBaseNumber = (state: RootState) => state.game.baseNumber;
export const selectVs = (state: RootState) => state.game.vs;
export const selectValidMove = (state: RootState) => state.game.validMove;
export const selectLastPlayer = (state: RootState) => state.game.lastPlayer;
export const SelectWinner = (state: RootState) => state.game.winner;
export const selectCanPlay = (palyeKey: keyof PlayerState | undefined) => (
  state: RootState
) => {
  if (!palyeKey) return false;
  return state.game.canPlay[palyeKey];
};

export default gameSlice.reducer;
