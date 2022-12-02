import styled from "styled-components";


export const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  padding-top: 100px;
  align-items: center;
  margin-bottom: 80px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    gap: 30px;
  }

`;

export const StyledUserAvatar = styled.img`
  width: 250px;
  height: 250px;
  border: 4px solid #000;
  border-radius: 3px;
`;



export const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  padding-left: 80px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 0.95rem;
    padding-left: 15px;
    
  }
`;


