import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  playNextMove,
  selectCanPlay,
  selectValidMove,
} from "../../store/gameSlice";
import { PlayerState } from "../../store/playerDetailsSlice";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 24px 10px;
  border-top: 1px solid #00000069;
`;

const Button = styled.button`
  height: 56px;
  width: 56px;
  cursor: pointer;
  height: 62px;
  width: 62px;
  border: 1px solid rgb(0 0 0);
  font-size: xx-large;
  border-radius: 50%;
  background-color: #8699ea75;
  :hover:enabled {
    background-color: #8698ea;
    height: 70px;
    width: 70px;
    margin-bottom: -8px;
    ${(props: { edge?: "right" | "left" }) => `margin-${props.edge}:-8px`};
  }
  :focus {
    outline: none;
  }
  :disabled {
    cursor: not-allowed;
    background-color: #e624244a;
  }
`;
interface Props {
  playingAs: keyof PlayerState | undefined;
  onClick: (value: -1 | 0 | 1) => void;
}

const Controllers: React.FC<Props> = ({ playingAs, onClick }) => {
  const dispatch = useDispatch();
  const validMove = useSelector(selectValidMove);
  const canPlay = useSelector(selectCanPlay(playingAs!));

  const handleClick = (value: -1 | 0 | 1) => {
    if (value === validMove && canPlay) {
      dispatch(playNextMove());
    }
    if (canPlay) onClick(value);
  };

  return (
    <Wrapper>
      <Button onClick={() => handleClick(-1)} disabled={!canPlay} edge="left">
        -1
      </Button>
      <Button onClick={() => handleClick(0)} disabled={!canPlay}>
        0
      </Button>
      <Button onClick={() => handleClick(1)} disabled={!canPlay} edge="right">
        +1
      </Button>
    </Wrapper>
  );
};

export default React.memo(Controllers);
