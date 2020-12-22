import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const Label = styled.div`
  border: 2px solid #50aadd;
  padding: 4px;
  border-radius: 10px;
  font-family: cursive;
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
`;

interface Props  {
  label: string;
  clickHandler: () => void;
}

const WithLabel: React.FC<PropsWithChildren<Props>> = ({
  label,
  clickHandler,
  children,
}) => (
  <FlexCentered onClick={clickHandler}>
    {children}
    <Label>{label}</Label>
  </FlexCentered>
);

export default React.memo(WithLabel);
