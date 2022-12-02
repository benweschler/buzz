import styled from "styled-components";

export const UserColumnDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: ${({ theme }) => theme.mobile}) {
        flex-direction: column;
        gap: 5rem;
        font-size: 1.3rem;
    }
`

export const LeftColumnUser = styled.div`

  width: 50%;
  text-align: center;
`;

export const RightColumnUser = styled.div`

  width: 50%;
  padding-left: 20px;
  text-align: center;
`;