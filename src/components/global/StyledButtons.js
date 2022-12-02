import styled from "styled-components";
import Color from "color";

export const StyledIconButton = styled.button`
  border: ${({theme}) => Color(theme.text).alpha(0.2)} 1px solid;
  background: transparent;
  color: ${({theme}) => theme.text};
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  aspect-ratio: 1;
  transition: color 100ms ease-in, border 100ms ease-in, background 100ms ease-in;
  max-width: fit-content;
  max-height: fit-content;
  
  &:hover {
    color: ${({theme}) => theme.main};
    border: ${({theme}) => Color(theme.main).alpha(0.5)} 1px solid;
    background: ${({theme}) => Color(theme.main).alpha(0.07)};
  }
`
