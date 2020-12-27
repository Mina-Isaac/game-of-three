import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setVs } from "../../store/gameSlice";
import { initializePlayer } from "../../store/playerDetailsSlice";
import robot from "../../img/robot.png";
import man from "../../img/man.png";
import WithLabel from "../Common/WithLabel";
import { keyframes } from "styled-components";

export const generateAnimation = (edge: "top" | "bottom") => keyframes`
0% {
  transform: translateY(${edge === "top" ? "250%" : "-250%"});
}
100% {
  transform: translateY(0%)
}
`;

const RivalSelector: React.FC = () => {
  const dispatch = useDispatch();

  const handleClickCPU = useCallback(() => {
    dispatch(setVs("cpu"));
    dispatch(
      initializePlayer({
        type: "cpu",
        name: "CPU",
        playerKey: "player2",
      })
    );
  }, [dispatch]);

  const handleClickHuman = useCallback(() => {
    dispatch(setVs("human"));
  }, [dispatch]);

  return (
    <>
      <WithLabel
        clickHandler={handleClickCPU}
        label="VS CPU"
        animation={generateAnimation("top")}
      >
        <img width={"80px"} src={robot} alt="robot" />
      </WithLabel>
      <WithLabel
        clickHandler={handleClickHuman}
        label="VS Human"
        animation={generateAnimation("bottom")}
      >
        <img width={"80px"} src={man} alt="man" />
      </WithLabel>
    </>
  );
};

export default React.memo(RivalSelector);
