import styled from "styled-components";

export const StyledFollowingButton = styled.div`
  width: 300px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: color 200ms ease-in;
  border-radius: 0.5rem;
  pointer-events: all;
  cursor: pointer;

  border: ${({theme}) => theme.brightness === "light"
          ? "black"
          : "rgba(239,71,161,0.5)"} 1px solid;
  background: ${({theme}) => theme.brightness === "light"
          ? theme.highlightCard
          : "rgba(239,71,161,0.5)"};
  color: ${({theme}) => theme.text};
`
