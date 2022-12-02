import styled from "styled-components";

export const CloseButton = styled.div`
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  font-size: 2rem;
`

export const IDTitle = styled.h3`
  color: white;
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

export const QRBorder = styled.div`
  border-radius: 0.2rem;
  padding: 1rem;
  background: white;
  max-height: fit-content;
  align-self: center;
`

export const QRRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`
