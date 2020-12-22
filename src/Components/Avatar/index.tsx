import React, { useMemo } from "react";
import styled from "styled-components";
import { generateNumberFromText } from "../../utils";

const colors = [
  "#000000",
  "#00AA55",
  "#009FD4",
  "#1900ff",
  "#B381B3",
  "#939393",
  "#E3BC00",
  "#D47500",
  "#DC2A2A",
];

const Circle = styled.div`
  font-size: 30px;
  font-family: monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  height: 52px;
  border-radius: 50%;
  color: white;
  background-color: ${(props: { bgColor: string }) => props.bgColor};
`;

interface Props {
  name: string;
}

const Avatar: React.FC<Props> = ({ name }) => {
  const initials = useMemo(
    () =>
      name
        .trim()
        .split(" ")
        .slice(0, 2)
        .map((item) => item[0].toUpperCase())
        .join(""),
    [name]
  );

  const bgColor = useMemo(() => {
    const num = generateNumberFromText(name) % 9;
    return colors[num];
  }, [name]);

  return <Circle bgColor={bgColor}>{initials}</Circle>;
};

export default React.memo(Avatar);
