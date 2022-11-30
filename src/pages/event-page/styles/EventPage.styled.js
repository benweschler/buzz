import styled from "styled-components";

export const StyledEventLeftColumn = styled.div`
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 100px;
  width: 30%;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`;
export const StyledEventRightColumn = styled.div`
  float: left;
  padding-top: 100px;
  padding-left: 80px;
  width: 70%;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding-top: 20px;
    padding-left: 30px;
  }
`;

export const StyledEventImage = styled.img`
  aspect-ratio: 4/4;
  object-fit: cover;
  border-radius: 10px;
  z-index: 10;
`;

export const StyledEventMainInfo = styled.div`
  padding-top: 10px;
`;

export const StyledEventHeader = styled.h1`
  font-size: 2.5rem;
  font-family: "Montserrat", sans-serif;
`;

export const StyledEventDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledEventDate = styled.h2`
  color: #ffba00;
  font-size: 2rem;
  margin-top: -20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledSecurityMessage = styled.p`
  font-size: 0.8rem;
  padding-left: 10px;
`;

export const StyledEventTags =styled.div`
`

export const StyledEventLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`