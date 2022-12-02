import styled from "styled-components";




export const OrganizationDescription = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

export const OrgBottomContainer = styled.div`
  margin-top: 40px;
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    padding-top: 30px;
  }
`;

export const OrgLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  text-align: start;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`;

export const OrgRightColumn = styled.div`
  display: flex;
  flex-direction: column;

  width: 50%;
  text-align: start;
  padding-left: 20px;
  justify-content: start;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
    padding-left: 0px;
  }
`;

export const OrgButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  margin: 0 auto;
  margin-left: 40%;
  background: rgba(0,0,0, 0.03);
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    
    
    width: 50%;
    margin: auto;
    justify-content: center;  
    margin-top: 20px;
    z-index: 200;
  }
`;

export const OrgButton = styled.button`
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
  width: 100px;

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

export const OrganizationEventsDiv = styled.div`
  margin-top: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${({ theme }) => theme.card};
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;

`;


export const OrgEventsContainer = styled.div`

`

export const OrgEvent = styled.div`

`

export const EventsHeaderOrg = styled.div`
  margin-top: 150px;
  display: flex;
  justify-content: start;
`