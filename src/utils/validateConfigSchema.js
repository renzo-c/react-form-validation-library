import * as validators from "calidators";

const warning = (condition, message) => {
  if (process.env.NODE_ENV === "production" || condition) {
    return;
  }

  console.warn("useValidation: " + message);
};

const invariant = (condition, message) => {
  if (process.env.NODE_ENV === "production" || condition) {
    return;
  }

  throw new Error("useValidation: " + message);
};

const validateConfigSchema = (validationConfig) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  if (typeof validationConfig === "function") {
    validationConfig = validationConfig({});
  }

  invariant(
    typeof validationConfig === "object",
    `useValidation should be called with an object or a function returning an object. You passed a ${typeof validationConfig}.`
  );

  invariant(
    typeof validationConfig.fields === "object",
    "useValidation requires a `field` prop with an object containing the fields and their validators."
  );

  invariant(
    Object.values(validationConfig.fields).every((field) => typeof field === "object"),
    "useValidation requires that the `field` object only contains objects. It looks like yours isn't."
  );

  for (let fieldName in validationConfig.fields) {
    const fieldsConfig = validationConfig.fields[fieldName];
    for (let validatorName in fieldsConfig) {
      if (["initialValue"].includes(validatorName)) {
        continue;
      }
      invariant(
        validators[validatorName],
        `useValidation requires all validators specified to be a part of the \`calidators\` library. "${validatorName}" is not a valid validator (specified on the ${fieldName} field).`
      );
    }
  }

  warning(
    ["always", "blur", "submit", undefined].includes(validationConfig.showError),
    'useValidation received an unsupported value in the `showError` prop. Valid values are "always", "blur" or "submit".'
  );
};

export default validateConfigSchema;
