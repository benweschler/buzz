import { Link } from "react-router-dom";
import styled from "styled-components";

export const UserColumnDiv = styled.div`
    display: flex;
    
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    flex-direction: row;
    gap: 5rem;
    @media (max-width: ${({ theme }) => theme.mobile}) {
        flex-direction: column;

        font-size: 1.3rem;
    }
`

export const LeftColumnUser = styled.div`

  display: flex;
  flex-direction: column;
  text-align: center;
  width: 50%;
  @media (max-width: ${({ theme }) => theme.mobile}) {
        width: 100%;
    }
`;

export const UserTicketsDiv = styled.div`
  margin-top: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  align-items: center;
  justify-content: start;
  width: 100%;
  background: ${({ theme }) => theme.card};
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  height: 500px;
  overflow-y: auto;
`;

export const TicketsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 1.5rem;
  width: 100%;
  margin: 10px 10px;

`

export const RightColumnUser = styled.div`

  display: flex;
  flex-direction: column;
  width: 50%;
  text-align: center;
  justify-content: space-between;
  




  @media (max-width: ${({ theme }) => theme.mobile}) {
        width: 100%;
    }
`;


export const OrgTopRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
      gap: 30px;
      flex-direction: column;
    }

`

export const TicketHeaderUser = styled.div`
display: flex;
height: 100px;
align-items: center;
justify-content: center;

`

export const CreateEventLink = styled(Link)`
  height: 100%;
  display: flex;  
  align-items: center;
  justify-content: center;    
`