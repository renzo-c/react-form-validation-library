import React, { useContext } from "react";
import { ValidationContext } from "../../context/ValidationContext";
import { Button, DivError, Form, Input, Label } from "./loginForm-styles";

const LoginForm = () => {
  const { getFieldProps, getFormProps, isFormValid, errors, showErrors } = useContext(
    ValidationContext
  );

  return (
    <Form {...getFormProps()}>
      <Label>Username</Label>
      <Input error={errors.username} {...getFieldProps("username")} />
      {errors.username ? <DivError>{errors.username}</DivError> : <DivError visibility="hidden">Error Message</DivError>}

      <Label>Password</Label>
      <Input error={errors.password} {...getFieldProps("password")} />
      {errors.password ? <DivError>{errors.password}</DivError> : <DivError visibility="hidden">Error Message</DivError>}

      <Button type="submit" disabled={!isFormValid && showErrors !== 'submit'}>Submit my form</Button>
    </Form>
  );
};

export default LoginForm;
