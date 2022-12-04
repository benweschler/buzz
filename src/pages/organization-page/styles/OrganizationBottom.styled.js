import styled from "styled-components";




export const OrganizationDescription = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 1fr;
  
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-top: 20px;
  }
`;

export const OrgBottomContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    padding-top: 30px;
  }
`;

export const OrgTopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: start;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`;

export const OrgBottomRow = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  text-align: start;
  padding-left: 20px;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
    padding-left: 0;
  }
`;

export const OrgButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  width: 1fr;
  height: 4rem;
  margin: 0 10px;
  margin-left: 40%;
  background: rgba(0,0,0, 0.03);
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    
    margin: auto;
    justify-content: space-between;  
    margin-top: 20px;
    z-index: 200;
    position: fixed;
    bottom: 10px; 
    width: 93%;
    margin: auto;
    padding: 10px;
    
   
    
  
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

  margin: 0 15px;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 1.5rem;
  width: 100%;

`

export const OrgEvent = styled.div`

`

export const EventsHeaderOrg = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
`

export const CreateEventButton = styled.button`
  appearance: menulist-button;
  backface-visibility: hidden;
  background-color: #405cf5;
  border-radius: 6px;
  border-width: 0;
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: -apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif;
  font-size: 100%;
  height: 40px;
  line-height: 1;
  margin: 0 25px;
  outline: none;
  font-size: 0.8rem;
  overflow: hidden;
  padding: 10px 25px;
  position: relative;
  text-align: center;
  text-transform: none;
  transform: translateZ(0);
  transition: all .2s,box-shadow .08s ease-in;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 80%;


:disabled {
  cursor: default;
}

:focus {
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .2) 0 6px 15px 0, rgba(0, 0, 0, .1) 0 2px 2px 0, rgba(50, 151, 211, .3) 0 0 0 4px;
}
`