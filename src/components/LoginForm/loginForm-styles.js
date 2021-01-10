import styled from "styled-components";

export const Input = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  color: #777;
  border: 2px solid ${(props) => (props.error ? "red" : "")};
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  color: ${(props) => (props.error ? "red" : "#777")};
`;

export const Button = styled.button`
  width: 100%;
  cursor: ${(props) => (props.disabled ? 'unset' : 'pointer')} !important;
  background-color: ${(props) => (props.disabled ? 'gray' : '#141414')} !important;
  margin: 0 0 2rem
`;

export const DivError = styled.div`
  color: red;
  visibility: ${(props) =>
    props.visibility === "hidden" ? "hidden" : "visible"};
  font-size: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
