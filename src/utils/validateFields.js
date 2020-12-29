import * as validators from "calidators";

const validateField = (fieldValue = "", fieldConfig) => {
  const specialProps = ["initialValue"];

  // fieldConfig = { isRequired: { message: "..." }, isMinLength: { message: "..." }..}
  for (let validatorName in fieldConfig) {
    if (specialProps.includes(validatorName)) {
      continue;
    }

    const validatorConfig = fieldConfig[validatorName];
    
    if (typeof validatorConfig === "string") {
      validatorConfig = { message: validatorConfig };
    }

    const validator = validators[validatorName];
    const configuredValidator = validator(validatorConfig);
    const errorMessage = configuredValidator(fieldValue);

    if (errorMessage) {
      return errorMessage;
    }
  }
  return null;
};

const validateFields = (fieldValues, fieldConfigs) => {
  const errors = {};

  for (let fieldName in fieldConfigs) {
    const fieldConfig = fieldConfigs[fieldName];
    const fieldValue = fieldValues[fieldName];

    errors[fieldName] = validateField(fieldValue, fieldConfig);
  }
  return errors;
};

export default validateFields;
