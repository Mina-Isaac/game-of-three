import React, { useState } from "react";
import styled from "styled-components";
import submit from "../../img/submit.png";

const StyledInput = styled.input`
  border: 1px solid #423e3e70;
  border-radius: 5px;
  font-size: 24px;
  outline: none;
  padding: 5% 2%;
  width: 95%;
  padding-right: 59px;
  :focus {
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  }
`;

const InputContiner = styled.div`
  position: relative;
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 5px;
  top: calc(50% - 29px);
  cursor: pointer;
  background-color: transparent;
  padding: 0;
`;

interface Props {
  handleSubmit: (value: string) => void;
  placeHolder: string;
  type?: string;
  [key: string]: any;
}

const Input: React.FC<Props> = ({
  handleSubmit,
  placeHolder,
  type = "text",
  ...inputProps
}) => {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <InputContiner>
      <StyledInput
        placeholder={placeHolder}
        type={type}
        value={value}
        autoFocus
        onChange={handleChange}
        onKeyDown={(e) => {
          e.key === "Enter" && handleSubmit(value);
        }}
        {...inputProps}
      />
      <SubmitButton disabled={value === ""} onClick={() => handleSubmit(value)}>
        <img width={58} src={submit} alt="submit" />
      </SubmitButton>
    </InputContiner>
  );
};

export default React.memo(Input);
