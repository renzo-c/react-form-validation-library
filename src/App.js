import React from "react";

import { LoginForm } from "./components";
import ValidationProvider from "./context/ValidationContext";

const App = () => {
  return (
    <ValidationProvider>
      <LoginForm />
    </ValidationProvider>
  );
};

export default App;
