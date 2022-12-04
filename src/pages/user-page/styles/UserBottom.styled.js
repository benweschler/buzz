import styled from "styled-components";

export const UserColumnDiv = styled.div`
    display: flex;
    
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    flex-direction: row;
    gap: 2rem;
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

export const ScrollableUserInfo = styled.div`
  margin-top: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  align-items: stretch;
  background: ${({ theme }) => theme.card};
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  height: 40rem;
  overflow-y: auto;
  gap: 1.5rem;
`;

export const TicketsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  width: 100%;
  gap: 1.5rem;
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
