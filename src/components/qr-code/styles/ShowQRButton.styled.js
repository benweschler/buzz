import styled from "styled-components";
import Color from "color";

export const QRButton = styled.button`
  border: rgba(0, 0, 0, 0.2) 1px solid;
  background: transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  aspect-ratio: 1;
  transition: color 100ms ease-in, border 100ms ease-in, background 100ms ease-in;
  
  &:hover {
    color: ${({theme}) => theme.main};
    border: ${({theme}) => Color(theme.main).alpha(0.5)} 1px solid;
    background: ${({theme}) => Color(theme.main).alpha(0.07)};
  }
`

export const CardScaffold = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const QRBorder = styled.div`
  border-radius: 0.2rem;
  padding: 1rem;
  background: white;
  max-height: fit-content;
  align-self: center;
`
export const IDTitle = styled.h3`
  color: white;
`

export const CloseButton = styled.div`
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  font-size: 2rem;
`

export const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const IDUserName = styled.div`
  color: rgba(255, 255, 255, 0.75);
  font-size: 1.15em;
`

export const TimeoutControlStack = styled.div`
  display: flex;
  gap: 1rem;
  color: white;
  height: 100%;
  justify-content: center;
  align-items: center;
  
  .refreshIcon {
    pointer-events: fill;
    z-index: 10;
    font-size: 9rem;
    cursor: pointer;
  }
  
  .expirationTimer {
    position: absolute;
    transform: translate(0, 0.7rem);
    font-size: 1.5em;
  }
`

export const QRRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`
