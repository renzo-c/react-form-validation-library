export default (state, action) => {
  switch (action.type) {
    case "change":
      const values = { ...state.values, ...action.payload };
      return {
        ...state,
        values,
        errors: {},
      };
    case "submit":
      return { ...state, submitted: true };
    case "validate":
      return { ...state, errors: action.payload };
    case "blur":
      const blurred = { ...state.blurred, [action.payload]: true };
      return { ...state, blurred };
    default:
      throw new Error("Unknown action type");
  }
};
