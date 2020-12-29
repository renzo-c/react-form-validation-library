import { useReducer, useMemo } from "react";

import validationReducer from "../reducers/validationReducer";
import validateFields from "../utils/validateFields";

import useDeepCompareEffect from "use-deep-compare-effect";
import getErrors from "../utils/getErrors";
import getInitialState from "../utils/getInitialState";
import validateConfigSchema from "../utils/validateConfigSchema";

const useValidation = (validationConfig) => {
  validateConfigSchema(validationConfig);

  const [state, dispatch] = useReducer(
    validationReducer,
    getInitialState(validationConfig)
  );

  if (typeof validationConfig === "function") {
    validationConfig = validationConfig(state.values);
  }

  useDeepCompareEffect(() => {
    const errors = validateFields(state.values, validationConfig.fields);
    dispatch({ type: "validate", payload: errors });
  }, [state.values, validationConfig.fields]);

  const errors = useMemo(() => getErrors(state, validationConfig), [
    state.blurred,
    state.submitted,
    state.errors,
    validationConfig.showErrors,
  ]);

  const isFormValid = useMemo(
    () => Object.values(errors).every((error) => error === null),
    [errors]
  );

  return {
    errors,
    submitted: state.submitted,
    isFormValid,

    getFormProps: (overrides = {}) => ({
      onSubmit: (e) => {
        e.preventDefault();
        dispatch({ type: "submit" });
        if (validationConfig.onSubmit) {
          validationConfig.onSubmit({ ...state, isFormValid });
        }
        
        if (overrides.onSubmit) {
          overrides.onSubmit(e)
        }
      },
    }),
    
    getFieldProps: (fieldName, overrides = {}) => ({
      onChange: (e) => {
        const { value } = e.target;

        if (!validationConfig.fields[fieldName]) {
          return;
        }

        dispatch({
          type: "change",
          payload: { [fieldName]: value },
        });

        if (overrides.onChange) {
          overrides.onChange(e);
        }
      },

      onBlur: () => {
        dispatch({ type: "blur", payload: fieldName });

        if (overrides.onBlur) {
          overrides.onBlur(e);
        }
      },

      name: overrides.name || fieldName,
      value: state.values[fieldName] || "",
      "aria-invalid": String(!!errors[fieldName]),
    }),
  };
};

export default useValidation;
