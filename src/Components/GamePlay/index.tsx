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
import robot from "../../img/robot.svg";
import Move from "./Move";

const Message = styled.p`
  font-family: cursive;
  font-size: x-large;
  padding: 0 10px;
`;

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

const Popup = styled.div`
  width: 154px;
  height: 39px;
  border-radius: 19px;
  border: 1px solid black;
  position: absolute;
  top: 81%;
  left: 29%;
  background-color: rgb(226 13 13 / 70%);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 2%;
  color: white;
  font-size: x-large;
  font-weight: bold;
`;

type PlayerId = 1 | 2;

interface Props {
  player1: Player;
  player2: Player;
  playingAs: "player1" | "player2" | undefined;
}

const GamePlay: React.FC<Props> = ({ player1, player2, playingAs }) => {
  const dispatch = useDispatch();
  const startingNumber = useSelector(selectStartingNumber);
  const baseNumber = useSelector(selectBaseNumber);
  const validMove = useSelector(selectValidMove)!;
  const lastPlayer = useSelector(selectLastPlayer);
  const [showPopup, setShowPopup] = useState(false);
  const [list, setList] = useState<{ move: -1 | 0 | 1; base: number }[]>([]);
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

  useEffect(() => {
    if (baseNumber !== undefined)
      setList((original) => [
        ...original,
        { move: validMove, base: baseNumber },
      ]);
    else setList([]);
  }, [baseNumber, validMove]);

  useEffect(() => {
    if (
      player2.type === "human" ||
      playingAs === undefined ||
      baseNumber === undefined ||
      baseNumber === 1
    )
      return;
    if (lastPlayer === "player1")
      setTimeout(() => dispatch(playNextMove()), Math.random() * 2000);
  }, [lastPlayer, baseNumber, dispatch, player2.type, playingAs]);

  useEffect(() => {
    if (anchorRef.current)
      anchorRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  });

  const onClick = (value: -1 | 0 | 1) => {
    if (value !== validMove) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 400);
    }
  };

  return (
    <>
      {baseNumber === undefined ? (
        (playingAs === "player1" && <GameStarter />) || (
          <Message>Waiting for player 1 to start the game</Message>
        )
      ) : (
        <>
          <Main>
            {showPopup && <Popup>Wrong move</Popup>}
            <FirstMove>Game started with {startingNumber}</FirstMove>
            {list.slice(0, -1).map(({ move, base }, index) => {
              const newBase = base + move;
              const joiner = move >= 0 ? "+" : "-";
              return (
                <Move
                  key={index}
                  txt1={`${base} ${joiner} ${Math.abs(move)} = ${newBase}`}
                  txt2={`${newBase} / 3 = ${newBase / 3}`}
                  playerId={((index % 2) + 1) as PlayerId}
                >
                  {(index % 2 && p2Avatar) || p1Avatar}
                </Move>
              );
            })}
            <i ref={anchorRef}></i>
          </Main>

          <Controllers playingAs={playingAs} onClick={onClick} />
        </>
      )}
    </>
  );
};

export default React.memo(GamePlay);
