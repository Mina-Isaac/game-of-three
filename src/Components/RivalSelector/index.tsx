import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setVs } from "../../store/gameSlice";
import { initializePlayer } from "../../store/playerDetailsSlice";
import robot from "../../img/robot.svg";
import man from "../../img/man.svg";
import WithLabel from "../Common/WithLabel";


const RivalSelector: React.FC = () => {
  const dispatch = useDispatch();

  const handleClickCPU = useCallback (() => {
    dispatch(setVs("cpu"));
    dispatch(
      initializePlayer({
        type: "cpu",
        name: "CPU",
        playerKey: "player2",
      })
    );
  },[dispatch])

  const handleClickHuman = useCallback(() => {
    dispatch(setVs("human"));
  }, [dispatch]);

  return (
    <>
      <WithLabel clickHandler={handleClickCPU} label="VS CPU">
        <img width={"80px"} src={robot} alt="robot" />
      </WithLabel>
      <WithLabel clickHandler={handleClickHuman} label="VS Human">
        <img width={"80px"} src={man} alt="man" />
      </WithLabel>
    </>
  );
};

export default React.memo(RivalSelector);
