const getErrors = (state, validationConfig) => {
  if (validationConfig.showErrors === "always") return state.errors;

  if (validationConfig.showErrors === "blur") {
    return Object.entries(state.blurred)
      .filter(([, blurred]) => blurred)
      .reduce((acc, [name]) => ({ ...acc, [name]: state.errors[name] }), {});
  }

  return state.submitted ? state.errors : {};
};

export default getErrors;
