import { useReducer, useMemo } from "react";

import validationReducer from "../reducers/validationReducer";
import {
  validateFields,
  getErrors,
  getInitialState,
  validateConfigSchema,
} from "../utils";

import useDeepCompareEffect from "use-deep-compare-effect";

const useValidation = (validationConfig) => {
  validateConfigSchema(validationConfig);

  const [state, dispatch] = useReducer(
    validationReducer,
    getInitialState(validationConfig)
  );
  if (typeof validationConfig === "function") {
    validationConfig = validationConfig(state.values, state.showErrors);
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

  const isFormValid = useMemo(() => {
    if (Object.keys(errors).length === 0) {
      return false;
    }
    return Object.values(errors).every((error) => error === null);
  }, [errors]);

  return {
    errors,
    submitted: state.submitted,
    isFormValid,
    showErrors: state.showErrors,

    getFormProps: (overrides = {}) => ({
      onSubmit: (e) => {
        e.preventDefault();
        dispatch({ type: "submit" });
        if (validationConfig.onSubmit) {
          validationConfig.onSubmit({ ...state, isFormValid });
        }

        if (overrides.onSubmit) {
          overrides.onSubmit(e);
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
    getValidationMode: (validationMode) => ({
      checked: state.showErrors === validationMode ? "checked" : null,
      onChange: () => {
        dispatch({ type: "validationMode", payload: validationMode });
      },
    }),
  };
};

export default useValidation;
