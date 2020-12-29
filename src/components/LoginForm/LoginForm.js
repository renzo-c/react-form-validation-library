import React, { useContext } from "react";
import { ValidationContext } from "../../context/ValidationContext";

const LoginForm = () => {
  const { getFieldProps, getFormProps, isFormValid, errors } = useContext(
    ValidationContext
  );

  return (
    <form {...getFormProps()}>
      <div>
        <label>
          Username
          <br />
          <input {...getFieldProps("username")} />
          {errors.username && <div className="error">{errors.username}</div>}
        </label>
      </div>
      <div>
        <label>
          Password
          <br />
          <input type="password" {...getFieldProps("password")} />
          {errors.password && <div className="error">{errors.password}</div>}
        </label>
      </div>
      {isFormValid ? (
        <div>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          The form is valid and ready to go!
        </div>
      ) : (
        <div className="error">Please fix the errors in your form!</div>
      )}
      <button type="submit">Submit my form</button>
    </form>
  );
};

export default LoginForm;
