import styled from "styled-components";


export const RsvpDiv = styled.div`
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

export const RsvpAbout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RsvpMessage = styled.p`
  font-size: 0.8rem;
  color: black;
`;

export const RsvpButton = styled.button`
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