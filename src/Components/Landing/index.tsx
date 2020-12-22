import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { initializePlayer, Player } from "../../store/playerDetailsSlice";
import StyledInput from "../Common/Input";
import RivalSelector from "../RivalSelector";

const Message = styled.p`
  font-family: cursive;
  font-size: x-large;
  padding: 0 10px;
`;

interface Props {
  player1: Player | undefined;
  player2: Player | undefined;
  vs: "human" | "cpu" | undefined;
  playingAs: "player1" | "player2" | "viewer" | undefined;
  setPlayingAs: any;
}

export const Landing: React.FC<Props> = ({
  player1,
  player2,
  vs,
  playingAs,
  setPlayingAs,
}) => {
  const dispatch = useDispatch();
  const generateHandler = (playerKey: "player1" | "player2") => (
    value: string
  ) => {
    if (value !== "") {
      dispatch(
        initializePlayer({
          type: 'human',
          name: value,
          playerKey,
        })
      );
      setPlayingAs(playerKey);
    }
  };

  const submitHandler1 = generateHandler("player1")
  const submitHandler2 = generateHandler("player2");

  return (
    <>
      {!player1 && !player2 && (
        <StyledInput
          handleSubmit={submitHandler1}
          placeHolder="Please enter your name"
        />
      )}
      {!player2 && vs === "human" && playingAs === undefined && (
        <StyledInput
          handleSubmit={submitHandler2}
          placeHolder="Please enter your name"
        />
      )}
      {!player2 && vs === "human" && playingAs === "player1" && (
        <Message>Waiting for the second player to join...</Message>
      )}
      {player1 && !player2 && !vs && <RivalSelector />}
    </>
  );
};
