import styled from "styled-components";
import Color from "color";

export const QRButton = styled.button`
  border: rgba(0, 0, 0, 0.2) 1px solid;
  background: transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  aspect-ratio: 1;
  transition: color 100ms ease-in, border 100ms ease-in;
  
  &:hover {
    color: ${({theme}) => theme.main};
    border: ${({theme}) => Color(theme.main).alpha(0.5)} 1px solid;
  }
`