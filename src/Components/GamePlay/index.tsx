import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  playNextMove,
  selectBaseNumber,
  selectLastPlayer,
  selectStartingNumber,
  selectValidMove,
} from "../../store/gameSlice";
import { Player } from "../../store/playerDetailsSlice";
import Avatar from "../Avatar";
import Controllers from "./Controllers";
import GameStarter from "./GameStarter";
import robot from "../../img/robot.png";
import Move from "./Move";
import Message from "../Common/Message";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scroll-behavior: smooth;
  width: 100%;
  height: 100%;
`;

const FirstMove = styled.div`
  align-self: center;
  border: 1px solid #00000063;
  border-radius: 15px;
  padding: 5px;
  margin-bottom: 20px;
  font-size: large;
  font-weight: bold;
  background-color: #1db5e278;
`;

interface Props {
  player1: Player;
  player2: Player;
  playingAs: "player1" | "player2" | undefined;
}

const GamePlay: React.FC<Props> = ({ player1, player2, playingAs }) => {
  interface Step {
    move: -1 | 0 | 1;
    base: number;
    player: typeof lastPlayer;
  }
  const dispatch = useDispatch();
  const startingNumber = useSelector(selectStartingNumber);
  const baseNumber = useSelector(selectBaseNumber);
  const validMove = useSelector(selectValidMove)!;
  const lastPlayer = useSelector(selectLastPlayer)!;
  const [list, setList] = useState<Step[]>([]);
  const anchorRef = React.useRef<HTMLLIElement>(null);

  const p1Avatar = useMemo(() => <Avatar name={player1.name} />, [
    player1.name,
  ]);
  const p2Avatar = useMemo(
    () =>
      (player2.type === "cpu" && <img width={52} src={robot} alt="CPU" />) || (
        <Avatar name={player2.name} />
      ),
    [player2.type, player2.name]
  );

  // This effect is responsible for populating the "list" state with steps in order for the component to render
  useEffect(() => {
    if (baseNumber !== undefined) {
      const player = lastPlayer === "player1" ? "player2" : "player1";
      setList((original) => [
        ...original,
        { move: validMove, base: baseNumber, player },
      ]);
    } else setList([]);
  }, [baseNumber, validMove, lastPlayer]);

  //This effect is responsible for the automatic playing of CPU
  useEffect(() => {
    if (
      player2.type === "human" ||
      playingAs === undefined ||
      baseNumber === undefined ||
      baseNumber === 1
    ) {
      return;
    }

    if (lastPlayer === "player1") {
      setTimeout(() => dispatch(playNextMove()), Math.random() * 2000);
    }
  }, [lastPlayer, baseNumber, dispatch, player2.type, playingAs]);


  //This effect is responsible for autoscrolling to botton as new steps are generated
  useEffect(() => {
    if (anchorRef.current)
      anchorRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  });
  

  return (
    <>
      {baseNumber === undefined ? (
        (playingAs === "player1" && <GameStarter />) || (
          <Message>Waiting for player 1 to start the game</Message>
        )
      ) : (
        <>
          <Main>
            <FirstMove>Game started with {startingNumber}</FirstMove>
            {list.slice(0, -1).map(({ move, base, player }, index) => {
              const newBase = base + move;
              const joiner = move >= 0 ? "+" : "-";
              return (
                <Move
                  key={index}
                  txt1={`${base} ${joiner} ${Math.abs(move)} = ${newBase}`}
                  txt2={`${newBase} / 3 = ${newBase / 3}`}
                  playerKey={player}
                  playingAs={playingAs}
                >
                  {(player === "player1" && p1Avatar) || p2Avatar}
                </Move>
              );
            })}
            <i ref={anchorRef}></i>
          </Main>

          {playingAs && <Controllers playingAs={playingAs} />}
        </>
      )}
    </>
  );
};

export default React.memo(GamePlay);
