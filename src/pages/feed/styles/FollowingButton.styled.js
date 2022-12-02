import styled from "styled-components";

export const StyledFollowingButton = styled.button`
  transition: color 200ms ease-in;
  border-radius: 0.5rem;
  pointer-events: all;
  cursor: pointer;
  transform: translate(21px);
  padding: 0.1rem;
  width: 305px;

  border: ${(props) => props.selected
          ? "rgba(239,71,161,0.5)"
          : "black"} 1px solid;
  background: ${(props) => props.selected 
          ? "rgba(239,71,161,0.5)"
          : props.theme.highlightCard};
  color: ${(props) => props.theme.text};
`
