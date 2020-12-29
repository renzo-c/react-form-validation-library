import validateFields from "../utils/validateFields";

const getInitialState = (config) => {
  if (typeof config === "function") {
    config = config({});
  }

  const initialValues = {};
  const initialBlurred = {};

  for (let fieldName in config.fields) {
    initialValues[fieldName] = config.fields[fieldName].initialValue || "";
    initialBlurred[fieldName] = false;
  }

  const initialErrors = validateFields(initialValues, config.fields);

  return {
    values: initialValues,
    errors: initialErrors,
    blurred: initialBlurred,
    submitted: false,
  };
};

export default getInitialState;
