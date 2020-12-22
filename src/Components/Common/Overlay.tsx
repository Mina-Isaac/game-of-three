import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import cup from "../../img/cup.png";
import ballons from "../../img/losing.png";
import { startNewGame } from "../../store/gameSlice";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(92 196 255 / 86%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  padding: 20%;
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
  outline: none;
  border: none;
  cursor: pointer;
`;

const Overlay: React.FC<{ winner: boolean }> = ({ winner }) => {
  const text = `You ${winner ? "win" : "lose"}`;
  const dispatch = useDispatch()
  return (
    <Container>
      <img src={winner ? cup : ballons} alt="end of game" width={200} />
      <Div>{text}</Div>
      <Button onClick = {()=>dispatch(startNewGame())} >New game</Button>
    </Container>
  );
};

export default Overlay;
