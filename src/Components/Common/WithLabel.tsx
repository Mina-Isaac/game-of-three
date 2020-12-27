import React, { PropsWithChildren } from "react";
import styled, { Keyframes } from "styled-components";

const Label = styled.div`
  border: 2px solid #50aadd;
  padding: 4px;
  border-radius: 10px;
  font-family: "Neucha", cursive;
  font-weight: bold;
  font-size: large;
  letter-spacing: 1px;
  width: fit-content;
  background-color: #0e78e245;
`;

const FlexCentered = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: fit-content;
  align-items: center;
  height: 25%;
  animation: ${(props: { animation: Keyframes }) => props.animation} 1s
    cubic-bezier(0.18, 0.89, 0.32, 1.28) 0s 1 normal none;
`;

interface Props {
  label: string;
  clickHandler: () => void;
  animation: Keyframes;
}

const WithLabel: React.FC<PropsWithChildren<Props>> = ({
  label,
  clickHandler,
  animation,
  children,
}) => (
  <FlexCentered onClick={clickHandler} animation={animation}>
    {children}
    <Label>{label}</Label>
  </FlexCentered>
);

export default React.memo(WithLabel);
