import React, { PropsWithChildren } from "react";
import styled from "styled-components";

interface Props {
  playerId: 1 | 2;
  txt1: string;
  txt2: string;
}

type AlternatingProps = Pick<Props, "playerId">;
interface BubbleProps extends AlternatingProps {
  bottom?: boolean;
}

const Alternating = styled.div`
  display: flex;
  ${(props: AlternatingProps) =>
    props.playerId === 2 && "flex-direction: row-reverse"};
  min-height: 78px;
  align-items: center;
`;

const Bubble = styled.div`
  background: ${(props: BubbleProps) =>
    (props.playerId === 1 && "#252538") || "#aa4848"};
  color: white;
  display: flex;
  align-items: center;
  padding: 2px 10px;
  line-height: 0px;
  font-size: large;
  height: 28px;
  margin: 0 9px;
  border-top-left-radius: ${({playerId, bottom}) => (playerId === 1 && bottom ? 0 : "18px")};
  border-top-right-radius: ${({playerId, bottom}) => (playerId === 2 && bottom ? 0 : "18px")};;
  border-bottom-right-radius: ${({playerId, bottom}) => (playerId === 2 && !bottom ? 0 : "18px")};
  border-bottom-left-radius: ${({playerId, bottom}) => (playerId === 1 && !bottom ? 0 : "18px")};
`;

const Div = styled.div`
  display: inline-flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
`;

const Move: React.FC<PropsWithChildren<Props>> = ({
  playerId,
  txt1,
  txt2,
  children,
}) => {
  return (
    <Alternating playerId={playerId}>
      {children}
      <Div>
        <Bubble playerId={playerId}>{txt1}</Bubble>
        <Bubble playerId={playerId} bottom>{txt2}</Bubble>
      </Div>
    </Alternating>
  );
};

export default React.memo(Move);
