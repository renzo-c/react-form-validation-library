import React, { useRef, useEffect, useCallback } from "react";

import { animated } from "react-spring";
import { LoginForm } from "../../components";
import ValidationSelector from "../ValidationSelector";

import {
  Background,
  ModalWrapper,
  ModalImg,
  ModalContent,
  CloseModalButton,
} from "./modal-styles";
import "./modal.css";

const Modal = ({ open, setOpen, style }) => {
  const modalRef = useRef();

  const handleClickAway = (e) => {
    if (modalRef.current === e.target) {
      setOpen(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    },
    [open, setOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
      <animated.div style={style} className="modal">
        <Background ref={modalRef} onClick={handleClickAway}>
          <ModalWrapper>
            <ModalImg src={require("../../utils/images/ice.jpg")} alt="camera" />
            <ModalContent>
              <ValidationSelector/>
              <h1>Are you ready?</h1>
              <p>Sign up to get exclusive access</p>
              <LoginForm />
            </ModalContent>
            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setOpen((prev) => !prev)}
            />
          </ModalWrapper>
        </Background>
      </animated.div>
  );
};

export default Modal;
