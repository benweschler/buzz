import styled from "styled-components";

export const MainInfo = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  
`;


export const InfoLeftColumn = styled.div`
  width: 70%;
`

export const InfoRightColumn = styled.div`
  width: 30%;
  align-items: center;
  display: flex;
  justify-content: center;
`
export const EventHeader = styled.h1`
  font-size: 3rem;

  margin-top: 10px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-style: italic;
`;

export const CapacityDiv = styled.div`
  margin-top: 10px;
  margin-left: 10px;  
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  gap: 10px;
  height: 30px;
  padding: 5px;

`
export const OrganizerEvent = styled.h2`
  margin-left: 10px;
  margin-top: 5px;
  font-size: 1.4rem;
  font-weight: 400;
`;

export const CapacityEvent = styled.h3`
  
  font-size: 1.3rem;
  font-weight: 300;
`

export const LocationEvent = styled.div`
  display: flex;
  align-items: start;
  gap: 10px;
  margin-left: 6px;
  margin-top: 40px;
`;
export const EventDateDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
  color: ${({theme}) => theme.altDarkerYellow};
  font-size: 2rem;
  padding: 10px;
  
`
export const DateIconEvent = styled.svg`

`

export const DateEvent = styled.h2`
  font-size: 2rem;
  align-items: flex-end;
  padding-top: 5px;
  
  
  

`;

export const EventTags = styled.div``;

export const LocationHeaderEvent = styled.h3``;

export const QRDivEvent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`

export const QRHeader = styled.h4`

`



