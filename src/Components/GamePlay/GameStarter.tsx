import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { initializeGame } from "../../store/gameSlice";
import { getRandomInt } from "../../utils";
import WithLabel from "../Common/WithLabel";
import dice from "../../img/dice.png";
import keyboard from "../../img/typing.png";
import Input from "../Common/Input";
import { generateAnimation } from "../RivalSelector";

const GameStarter: React.FC = () => {
  const dispatch = useDispatch();
  const [inputOpen, setInputOpen] = useState(false);

  const handleRandomClick = useCallback(
    () => dispatch(initializeGame(getRandomInt(1000, 20000))),
    [dispatch]
  );

  const handleSubmit = useCallback(
    (value: string) => {
      if (Number.isInteger(+value) && +value > 1) {
        dispatch(initializeGame(+value));
        setInputOpen(false);
      }
    },
    [dispatch]
  );

  return (
    <>
      {inputOpen ? (
        <Input
          type="number"
          placeHolder="Enter an integer > 1"
          handleSubmit={handleSubmit}
        />
      ) : (
        <>
          <WithLabel
            clickHandler={handleRandomClick}
            label="Random number"
            animation={generateAnimation("top")}
          >
            <img width={"80px"} src={dice} alt="dice" />
          </WithLabel>
          <WithLabel
            clickHandler={() => setInputOpen(true)}
            label="Enter a number"
            animation={generateAnimation("bottom")}
          >
            <img width={"80px"} src={keyboard} alt="keyboard" />
          </WithLabel>
        </>
      )}
    </>
  );
};

export default React.memo(GameStarter);
