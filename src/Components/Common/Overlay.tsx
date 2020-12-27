import React from "react";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import cup from "../../img/cup.png";
import ballons from "../../img/losing.png";
import { startNewGame } from "../../store/gameSlice";
import { PlayerState } from "../../store/playerDetailsSlice";

const fadeInFromNone = keyframes`
    0% {
        display: none;
        opacity: 0;
    }

    1% {
        display: block;
        opacity: 0;
    }

    100% {
        display: block;
        opacity: 1;
    }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(92 196 255 / 86%);
  z-index: 2;
  display: ${(props: { show: boolean }) => (props.show ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20%;
  animation-name: ${fadeInFromNone};
  animation-duration: 1s;
`;

const Div = styled.div`
  font-size: 44px;
  color: white;
  font-weight: 700;
`;

const Button = styled.button`
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  width: 243px;
  height: 56px;
  font-size: 21px;
  font-weight: bold;
  color: #4189bb;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  winnerId: keyof PlayerState | undefined;
  playingAs: keyof PlayerState | undefined;
}

const Overlay: React.FC<Props> = ({ winnerId, playingAs }) => {
  const winner = winnerId && winnerId === playingAs;
  const text = `You ${winner ? "win" : "lose"}`;
  const dispatch = useDispatch();
  return (
    <Container show={!!(winnerId && playingAs)}>
      <img src={winner ? cup : ballons} alt="end of game" width={200} />
      <Div>{text}</Div>
      <Button onClick={() => dispatch(startNewGame())}>New game</Button>
    </Container>
  );
};

export default Overlay;
