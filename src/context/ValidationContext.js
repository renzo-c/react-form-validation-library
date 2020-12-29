import React, {createContext, useMemo } from "react";
import useValidation from "../hooks/useValidation"
import validationConfig from "../utils/validationConfig"

export const ValidationContext = createContext({});

const ValidationProvider = ({children}) => {
  const context = useValidation(validationConfig);
  const memoizedContext = useMemo(() => context, [context]);

  return (
    <ValidationContext.Provider value={memoizedContext}>
      {children}
    </ValidationContext.Provider>
  );
};

export default ValidationProvider;