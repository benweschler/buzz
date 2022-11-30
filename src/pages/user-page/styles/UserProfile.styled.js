import styled from "styled-components";

export const StyledUserProfile = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  padding-top: 130px;
  align-items: center;
  margin-bottom: 80px;

`;

export const StyledUserAvatar = styled.img`
  width: 200px;
  height: 200px;
  border: 4px solid #000;
  border-radius: 3px;
`;

export const StyledLeftColumn = styled.div`
  float: left;
  width: 50%;
  text-align: center;
`;
export const StyledRightColumn = styled.div`
  float: left;
  width: 50%;
  padding-left: 20px;
  text-align: center;
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
