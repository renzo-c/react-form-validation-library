import React, { useContext } from "react";
import { ValidationContext } from "../../context/ValidationContext";
import { Input, Label } from "./valdiationSelector-styles";

const ValidationSelector = () => {
  const { getValidationMode } = useContext(ValidationContext);
  return (
    <div>
      <Label>
        {`Always `}
        <Input type="radio" name="radio" {...getValidationMode("always")} />
      </Label>
      <Label>
        {`OnBlur `}
        <Input type="radio" name="radio" {...getValidationMode("blur")} />
      </Label>
      <Label>
        {`Submit `}
        <Input type="radio" name="radio" {...getValidationMode("submit")} />
      </Label>
    </div>
  );
};

export default ValidationSelector;
