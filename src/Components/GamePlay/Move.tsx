import React, { PropsWithChildren } from "react";
import styled, { keyframes } from "styled-components";
import { PlayerState } from "../../store/playerDetailsSlice";

interface Props {
  txt1: string;
  txt2: string;
  playerKey: keyof PlayerState;
  playingAs: keyof PlayerState | undefined;
}

interface AlternatingProps {
  renderRight: boolean;
}
interface BubbleProps extends AlternatingProps {
  bottom?: boolean;
}

const scaleUp = keyframes`
0% {
  transform: scale(0);
}

  100% {
    transform: scale(1);
  }
`;

const Alternating = styled.div`
  display: flex;
  ${(props: AlternatingProps) =>
    props.renderRight && "flex-direction: row-reverse"};
  min-height: 78px;
  align-items: center;
`;

const Bubble = styled.div`
  background: ${(props: BubbleProps) =>
    (props.renderRight && "#252538") || "#aa4848"};
  animation: ${scaleUp} 0.3s ease forwards;
  color: white;
  display: flex;
  align-items: center;
  padding: 2px 10px;
  line-height: 0px;
  font-size: large;
  height: 28px;
  margin: 0 9px;
  border-top-left-radius: ${({ renderRight, bottom }) =>
    !renderRight && bottom ? 0 : "18px"};
  border-top-right-radius: ${({ renderRight, bottom }) =>
    renderRight && bottom ? 0 : "18px"};
  border-bottom-right-radius: ${({ renderRight, bottom }) =>
    renderRight && !bottom ? 0 : "18px"};
  border-bottom-left-radius: ${({ renderRight, bottom }) =>
    !renderRight && !bottom ? 0 : "18px"};
`;

const Div = styled.div`
  display: inline-flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
`;

const Move: React.FC<PropsWithChildren<Props>> = ({
  txt1,
  txt2,
  children,
  playerKey,
  playingAs,
}) => {
  const renderRight =
    (playingAs && playerKey !== playingAs) ||
    (!playingAs && playerKey === "player2");

  return (
    <Alternating renderRight={renderRight}>
      {children}
      <Div>
        <Bubble renderRight={renderRight}>{txt1}</Bubble>
        <Bubble renderRight={renderRight} bottom>
          {txt2}
        </Bubble>
      </Div>
    </Alternating>
  );
};

export default React.memo(Move);
