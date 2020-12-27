import React, { useState } from "react";
import { Landing } from "./Components/Landing";
import "./App.css";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectPlayer1, selectPlayer2 } from "./store/playerDetailsSlice";
import { selectVs, SelectWinner } from "./store/gameSlice";
import GamePlay from "./Components/GamePlay";
import Overlay from "./Components/Common/Overlay";

const Container = styled.div`
  background: #f5f8fb;
  border-radius: 10px;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.15);
  font-family: monospace;
  overflow: hidden;
  width: 350px;
  height: 100vh;
  position: relative;
  @media screen and (max-width: 568px) {
    border-radius: 0;
    width: 100%;
  }
`;

const Header = styled.div`
  align-items: center;
  background: #50aadd;
  color: white;
  display: flex;
  height: 56px;
  justify-content: center;
  align-items: center;
  font-size: medium;
  font-weight: 700;
  padding: 0 10px;
`;

const Content = styled.div`
  height: calc(100% - 58px);
  overflow-y: auto;
  margin-top: 2px;
  padding-top: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  flex: 1;
`;

function App() {
  const player1 = useSelector(selectPlayer1);
  const player2 = useSelector(selectPlayer2);
  const vs = useSelector(selectVs);
  const winnerId = useSelector(SelectWinner);
  const players = { player1, player2 };
  const [playingAs, setPlayingAs] = useState<"player1" | "player2" | undefined>(
    undefined
  );
  return (
    <div className="App">
      <Container>
        <Header>
          <h1>Game of three!</h1>
        </Header>
        <Content>
          {!player1 || !player2 ? (
            <Landing
              {...players}
              vs={vs}
              playingAs={playingAs}
              setPlayingAs={setPlayingAs}
            />
          ) : (
            <GamePlay
              player1={player1}
              player2={player2}
              playingAs={playingAs}
            />
          )}
        </Content>
        <Overlay winnerId={winnerId} playingAs={playingAs} />
      </Container>
    </div>
  );
}

export default App;
