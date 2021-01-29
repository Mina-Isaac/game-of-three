import React from "react";
import ReactDOM from "react-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState as initialGameState } from "../../store/gameSlice";
import { initialState as initialPlayerState } from "../../store/playerDetailsSlice";
import renderer from "react-test-renderer";
import Controllers from "../../Components/GamePlay/Controllers";
const mockStore = configureStore();
let store: any;

describe("Controllers component should render without issues", () => {
  beforeEach(() => {
    const initialState = { player: initialPlayerState, game: initialGameState };
    store = mockStore(initialState);
  });
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <Controllers playingAs = {undefined}  />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Controllers playingAs = {undefined}  />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
