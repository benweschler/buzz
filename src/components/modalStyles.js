import styled from "styled-components";

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundImage: "linear-gradient(to right, #ffa700, #ffc531)",
  boxShadow: 24,
  borderRadius: "0.8rem",
  p: 4,
  outline: "none",
};

export const ModalCardScaffold = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: min-content;
`
