import { RootState, rootReducer } from "../../store/store";
import {
  initializeGame,
  playNextMove,
  setVs,
} from "../../store/gameSlice";
import {
  initializePlayer,
  Player,
  PlayerState,
} from "../../store/playerDetailsSlice";

const getInitialState = (initial?: RootState) =>
  rootReducer(initial as RootState, {} as any);

describe("Reducer data flow", () => {
  it("should match a snapshot", () => {
    const initialState = getInitialState();
    expect(initialState).toMatchSnapshot();
  });

  it("should initialize player with the specified player key and details", () => {
    const samplePayload: Player & { playerKey: keyof PlayerState } = {
      playerKey: "player1",
      name: "sample name",
      type: "human",
    };
    const initialState = getInitialState();
    const state = rootReducer(initialState, initializePlayer(samplePayload));
    expect(state.player[samplePayload.playerKey]?.name).toEqual(
      samplePayload.name
    );
    expect(state.player[samplePayload.playerKey]?.type).toEqual(
      samplePayload.type
    );
  });
  it("should initialize game with the passed number", () => {
    const sampleNumber = 1234567;
    const initialState = getInitialState();
    const state = rootReducer(initialState, initializeGame(sampleNumber));
    expect(state.game.baseNumber).toEqual(sampleNumber);
    expect(state.game.startingNumber).toEqual(sampleNumber);
  });
  it("should paly next move with the playNext() action", () => {
    const initialState = getInitialState();
    initialState.game.baseNumber = 8;
    initialState.game.validMove = 1;

    const state = rootReducer(initialState, playNextMove());
    expect(state.game.baseNumber).toEqual((8+1)/3);
    expect(state.game.validMove).toEqual(0);
  });
  it("should set state.vs with the passed value", () => {
    const initialState = getInitialState();
    expect(initialState.game.vs).toBe(undefined);
    const sampleValue = 'cpu';
    const state = rootReducer(initialState, setVs(sampleValue));
    expect(state.game.vs).toBe(sampleValue);
  });
});
