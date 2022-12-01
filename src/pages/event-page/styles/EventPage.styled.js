import styled from "styled-components";

export const StyledEventContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
  }
`;
export const StyledEventLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 100px;
  width: 30%;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`;
export const StyledEventRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin-left: 80px;
  width: 70%;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-top: 20px;
    margin-left: 0px;
    width: 100%;
  }
`;

export const StyledEventImageDiv = styled.div`
aspect-ratio: 4/4;

`

export const StyledEventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  z-index: 10;
`;

export const StyledSecurityMessage = styled.p`
  font-size: 0.8rem;
  padding-left: 10px;
`;

export const StyledEventMainInfo = styled.div`
  display: flex;
  flex-direction: row;
`;


export const StyledEventInfoLeftColumn = styled.div`
  width: 70%;
`

export const StyledEventInfoRightColumn = styled.div`
  width: 30%;
  align-items: center;
  display: flex;
  justify-content: center;
`
export const StyledEventHeader = styled.h1`
  font-size: 3rem;

  margin-top: 10px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-style: italic;
`;

export const StyledEventCapacityDiv = styled.div`
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
export const StyledEventOrganizer = styled.h2`
  margin-left: 10px;
  margin-top: 5px;
  font-size: 1.4rem;
  font-weight: 400;
`;

export const StyledEventCapacity = styled.h3`
  
  font-size: 1.3rem;
  font-weight: 300;
`

export const StyledEventLocation = styled.div`
  display: flex;
  align-items: start;
  gap: 10px;
  margin-left: 6px;
  margin-top: 40px;
`;
export const StyledEventDateDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
  color: ${({theme}) => theme.altDarkerYellow};
  font-size: 2rem;
  padding: 10px;
  
`
export const StyledEventDateIcon = styled.svg`

`

export const StyledEventDate = styled.h2`
  font-size: 2rem;
  align-items: flex-end;
  padding-top: 5px;
  
  
  

`;

export const StyledEventTags = styled.div``;

export const StyledEventLocationHeader = styled.h3``;

export const StyledEventQRDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`

export const StyledEventQRHeader = styled.h4`

`




export const StyledRsvpDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  padding-left: 30px;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  margin-top: 70px;
  background: ${({theme}) => theme.card};
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    position: fixed;
    bottom: 10px; 
    width: 93%;
    margin: auto;
    z-index: 200;
    padding: 10px;
    
   
    
  }
`;

export const StyledRsvpAbout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledRsvpMessage = styled.p`
  font-size: 0.8rem;
  color: black;
`;

export const StyledRsvpButton = styled.button`
  /* display: flex;
  justify-content: flex-end;
  text-decoration: none;
  border: none;
  border-radius: 15px;
  padding: 15px 50px;
  margin-left: 60%;
  font-size: 20px;
  background-color: #f33; */
  background: #ff4742;
  border: 1px solid #ff4742;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  margin: 15px 15px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  margin-left: 30%;
  :hover,
  :active {
    /* background-color: initial;
    background-position: 0 0;
    color: #FF4742; */
    filter: brightness(85%);
    transition: filter 100ms ease-in;
  }

  .activated {
    background: green;

  }

  :active {
    opacity: 0.5;
  }
`;

export const StyledEventDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  margin-bottom: 200px;
`;
