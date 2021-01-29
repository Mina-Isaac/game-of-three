import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  playNextMove,
  selectCanPlay,
  selectValidMove,
} from "../../store/gameSlice";
import { PlayerState } from "../../store/playerDetailsSlice";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
  width: 100%;
  padding: 10px 24px 10px;
  border-top: 1px solid #00000069;
`;

const Div = styled.div`
  display: inline-block;
  height: fit-content;
  width: fit-content;
  border-radius: 50%;

  :hover button:enabled {
    background-color: #0e78e2cc;
    height: 75px;
    width: 75px;
    margin-bottom: -13px;
    ${(props: { edge?: "right" | "left" }) => `margin-${props.edge}:-13px`};
  }
`;

const Button = styled.button`
  height: 62px;
  width: 62px;
  border: 1px solid rgb(0 0 0);
  font-size: xx-large;
  border-radius: 50%;
  background-color: #50aadd9c;
  transition: all 130ms;
  :disabled {
    background-color: #e624244a;
  }
`;

const Popup = styled.div`
  width: 154px;
  height: 39px;
  border-radius: 19px;
  border: 1px solid black;
  position: absolute;
  top: -45%;
  left: 26%;
  background-color: rgb(226 13 13 / 70%);
  z-index: 1;
  display: ${(props: { show: boolean }) => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  padding: 2%;
  color: white;
  font-size: x-large;
  font-weight: bold;
`;
interface Props {
  playingAs: keyof PlayerState | undefined;
}

const Controllers: React.FC<Props> = ({ playingAs }) => {
  const dispatch = useDispatch();
  const validMove = useSelector(selectValidMove);
  const canPlay = useSelector(selectCanPlay(playingAs));
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (value: -1 | 0 | 1) => {
    if (!canPlay) return;
    if (value === validMove) dispatch(playNextMove());
    else {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 400);
    }
  };

  return (
    <Wrapper>
      <Div edge="left">
        <Button onClick={() => handleClick(-1)} disabled={!canPlay}>
          -1
        </Button>
      </Div>
      <Div>
        <Button onClick={() => handleClick(0)} disabled={!canPlay}>
          0
        </Button>
      </Div>
      <Div edge="left">
        <Button onClick={() => handleClick(1)} disabled={!canPlay}>
          +1
        </Button>
      </Div>
      <Popup show={showPopup}>Wrong move</Popup>
    </Wrapper>
  );
};

export default React.memo(Controllers);
