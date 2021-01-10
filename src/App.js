import React, { useState } from "react";

import ValidationProvider from "./context/ValidationContext";

import { Modal } from "./components";

import { useTransition } from "react-spring";
import { GlobalStyle } from "./styles/globalStyles";
import { Container, Button } from "./styles/app-styles";

const App = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  const transitions = useTransition(open, null, {
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
  });

  return (
    <ValidationProvider>
      <GlobalStyle />
      <Container>
        <Button onClick={handleClick}>Open the Demo =)</Button>
        {transitions.map(
          ({ item, key, props: style }) =>
            item && (
              <Modal key={key} open={open} setOpen={setOpen} style={style} />
            )
        )}
      </Container>
    </ValidationProvider>
  );
};

export default App;
