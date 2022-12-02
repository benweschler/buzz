import styled from "styled-components";

export const EventContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
  }
`;

export const EventRightColumn = styled.div`
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

export const EventDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  margin-bottom: 200px;
`;
